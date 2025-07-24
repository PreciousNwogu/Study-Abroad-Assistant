import { NextRequest, NextResponse } from "next/server";
import {
  assignToAgent,
  getAgentById,
  getAllActiveAgents,
  getAgentsByRegion,
  createSOPRequest,
} from "@/lib/agent-assignment";
import { sendAgentAssignment } from "@/lib/email-service";

interface AssignmentRequest {
  serviceType: "admission" | "visa";
  country: string;
  clientData?: {
    name: string;
    email: string;
    phone?: string;
    studyLevel: string;
    program?: string;
    universities?: string[];
    urgency?: string;
    deliveryFormat?: string;
  };
  sopContent?: string;
  amount?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: AssignmentRequest = await request.json();
    const { serviceType, country, clientData, sopContent, amount } = body;

    if (!serviceType || !country) {
      return NextResponse.json(
        { error: "Service type and country are required" },
        { status: 400 }
      );
    }

    const assignedAgent = assignToAgent(serviceType, country);

    if (!assignedAgent) {
      return NextResponse.json(
        {
          error: `No agent available for ${serviceType} service in ${country}`,
        },
        { status: 404 }
      );
    }

    // If full client data and SOP content are provided, create request and send email
    if (clientData && sopContent) {
      const fullClientData = {
        ...clientData,
        country,
        serviceType,
      };

      // Create SOP request
      const sopRequest = createSOPRequest(fullClientData, amount || 149);

      if (!sopRequest) {
        return NextResponse.json(
          { error: "Failed to create SOP request" },
          { status: 500 }
        );
      }

      // Send email to agent with client data and SOP
      const emailResult = await sendAgentAssignment(
        assignedAgent.email,
        assignedAgent.name,
        fullClientData,
        sopContent,
        sopRequest.id
      );

      return NextResponse.json({
        success: true,
        agent: {
          id: assignedAgent.id,
          name: assignedAgent.name,
          email: assignedAgent.email,
          specialty: assignedAgent.specialty,
          country: assignedAgent.country,
          region: assignedAgent.region,
          commissionRate: assignedAgent.commissionRate,
        },
        request: {
          id: sopRequest.id,
          commission: sopRequest.agentCommission,
          emailSent: emailResult.success,
        },
      });
    }

    // Basic assignment without email (original functionality)
    return NextResponse.json({
      success: true,
      agent: {
        id: assignedAgent.id,
        name: assignedAgent.name,
        email: assignedAgent.email,
        specialty: assignedAgent.specialty,
        country: assignedAgent.country,
        region: assignedAgent.region,
        commissionRate: assignedAgent.commissionRate,
      },
    });
  } catch (error) {
    console.error("Agent assignment error:", error);
    return NextResponse.json(
      { error: "Failed to assign agent" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const agentId = searchParams.get("agentId");
    const region = searchParams.get("region");
    const action = searchParams.get("action");

    if (agentId) {
      const agent = getAgentById(agentId);
      if (!agent) {
        return NextResponse.json({ error: "Agent not found" }, { status: 404 });
      }
      return NextResponse.json({ agent });
    }

    if (region) {
      const agents = getAgentsByRegion(region);
      return NextResponse.json({ agents });
    }

    if (action === "list") {
      const agents = getAllActiveAgents();
      return NextResponse.json({ agents });
    }

    return NextResponse.json(
      { error: "Invalid request parameters" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Agent retrieval error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve agent information" },
      { status: 500 }
    );
  }
}
