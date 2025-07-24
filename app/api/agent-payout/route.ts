import { NextRequest, NextResponse } from "next/server";
import {
  getPendingPayouts,
  getAgentStats,
  getSOPRequestsByAgent,
  getSOPRequestsByStatus,
  updateSOPRequestStatus,
  getAllActiveAgents,
} from "@/lib/agent-assignment";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    const agentId = searchParams.get("agentId");

    switch (action) {
      case "pending":
        const pendingPayouts = getPendingPayouts();
        const totalPending = pendingPayouts.reduce(
          (sum, payout) => sum + payout.pendingCommission,
          0
        );

        return NextResponse.json({
          pendingPayouts,
          totalPending,
          agentCount: pendingPayouts.length,
        });

      case "agent-stats":
        if (!agentId) {
          return NextResponse.json(
            { error: "Agent ID is required for stats" },
            { status: 400 }
          );
        }

        const agentStats = getAgentStats(agentId);
        if (!agentStats) {
          return NextResponse.json(
            { error: "Agent not found" },
            { status: 404 }
          );
        }

        const agentRequests = getSOPRequestsByAgent(agentId);
        const agentCompletedRequests = agentRequests.filter(
          (req) => req.status === "completed" || req.status === "delivered"
        );

        return NextResponse.json({
          ...agentStats,
          requests: {
            total: agentRequests.length,
            completed: agentCompletedRequests.length,
            pending: agentRequests.filter((req) => req.status === "pending")
              .length,
            inProgress: agentRequests.filter(
              (req) => req.status === "in_progress"
            ).length,
          },
        });

      case "dashboard":
        const allAgents = getAllActiveAgents();
        const allPendingPayouts = getPendingPayouts();
        const completedRequests = getSOPRequestsByStatus("completed");
        const deliveredRequests = getSOPRequestsByStatus("delivered");

        const thisMonth = new Date();
        thisMonth.setDate(1);
        thisMonth.setHours(0, 0, 0, 0);

        const thisMonthPayouts = [...completedRequests, ...deliveredRequests]
          .filter(
            (req) =>
              new Date(req.completedDate || req.deliveredDate || "") >=
              thisMonth
          )
          .reduce((sum, req) => sum + req.agentCommission, 0);

        const totalEarnings = allAgents.reduce(
          (sum, agent) => sum + agent.totalEarnings,
          0
        );

        return NextResponse.json({
          totalPendingAmount: allPendingPayouts.reduce(
            (sum, p) => sum + p.pendingCommission,
            0
          ),
          pendingAgentsCount: allPendingPayouts.length,
          thisMonthPayouts,
          totalEarnings,
          activeAgentsCount: allAgents.length,
          recentPayouts: allPendingPayouts.slice(0, 10), // Top 10 for display
        });

      default:
        return NextResponse.json(
          { error: "Invalid action specified" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Agent payout GET error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve payout information" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, agentId, requestIds, payoutDetails } = await request.json();

    switch (action) {
      case "process-payout":
        if (!agentId || !requestIds || !Array.isArray(requestIds)) {
          return NextResponse.json(
            { error: "Agent ID and request IDs are required" },
            { status: 400 }
          );
        }

        // Mark requests as paid (you might want to add a "paid" status)
        const processedRequests = requestIds.map((requestId) => {
          const updated = updateSOPRequestStatus(requestId, "delivered");
          return { requestId, processed: updated };
        });

        // In a real implementation, you would:
        // 1. Process the actual payment via Stripe, PayPal, etc.
        // 2. Record the payout in your database
        // 3. Send notification email to agent
        // 4. Update agent's total earnings

        // Send payout notification email to agent
        try {
          const agentStats = getAgentStats(agentId);
          if (agentStats) {
            await fetch(
              `${
                process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
              }/api/send-email`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  type: "agent_payout",
                  to: agentStats.email,
                  agentName: agentStats.name,
                  payoutAmount: payoutDetails.amount,
                  requestCount: requestIds.length,
                  payoutMethod: payoutDetails.method || "Bank Transfer",
                  payoutDate: new Date().toISOString(),
                }),
              }
            );
          }
        } catch (emailError) {
          console.error(
            "Failed to send payout notification email:",
            emailError
          );
        }

        return NextResponse.json({
          success: true,
          processedRequests,
          payoutAmount: payoutDetails.amount,
          message: `Payout of $${payoutDetails.amount} processed for ${requestIds.length} requests`,
        });

      case "update-request-status":
        const { requestId, newStatus } = payoutDetails;

        if (!requestId || !newStatus) {
          return NextResponse.json(
            { error: "Request ID and new status are required" },
            { status: 400 }
          );
        }

        const statusUpdated = updateSOPRequestStatus(requestId, newStatus);

        if (!statusUpdated) {
          return NextResponse.json(
            { error: "Failed to update request status" },
            { status: 400 }
          );
        }

        return NextResponse.json({
          success: true,
          requestId,
          newStatus,
          message: `Request ${requestId} status updated to ${newStatus}`,
        });

      default:
        return NextResponse.json(
          { error: "Invalid action specified" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Agent payout POST error:", error);
    return NextResponse.json(
      { error: "Failed to process payout request" },
      { status: 500 }
    );
  }
}
