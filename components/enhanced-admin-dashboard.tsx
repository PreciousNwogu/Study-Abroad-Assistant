"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  CreditCard,
  Mail,
  FileText,
  Download,
} from "lucide-react";
import { getCountryWithFlag } from "@/lib/country-utils";

interface DashboardData {
  totalPendingAmount: number;
  pendingAgentsCount: number;
  thisMonthPayouts: number;
  totalEarnings: number;
  activeAgentsCount: number;
  recentPayouts: Array<{
    agent: {
      id: string;
      name: string;
      email: string;
      specialty: string;
      country: string;
      region: string;
    };
    pendingCommission: number;
    completedRequests: Array<{
      id: string;
      clientName: string;
      country: string;
      serviceType: string;
      amount: number;
      status: string;
      completedDate?: string;
    }>;
  }>;
}

interface SOPRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  country: string;
  serviceType: string;
  amount: number;
  agentCommission: number;
  status: string;
  requestDate: string;
  assignedDate?: string;
  completedDate?: string;
  deliveredDate?: string;
}

export function EnhancedAdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [selectedPayout, setSelectedPayout] = useState<any>(null);
  const [payoutAmount, setPayoutAmount] = useState<string>("");
  const [payoutMethod, setPayoutMethod] = useState<string>("bank_transfer");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [requestDetails, setRequestDetails] = useState<SOPRequest[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/agent-payout?action=dashboard");
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  const handleProcessPayout = async (agentPayout: any) => {
    setIsProcessing(true);

    try {
      const requestIds = agentPayout.completedRequests.map(
        (req: any) => req.id
      );

      const response = await fetch("/api/agent-payout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "process-payout",
          agentId: agentPayout.agent.id,
          requestIds,
          payoutDetails: {
            amount: parseFloat(payoutAmount) || agentPayout.pendingCommission,
            method: payoutMethod,
          },
        }),
      });

      if (response.ok) {
        const result = await response.json();
        // Refresh dashboard data
        await fetchDashboardData();
        setSelectedPayout(null);
        setPayoutAmount("");
        alert(`Payout processed successfully: $${result.payoutAmount}`);
      } else {
        throw new Error("Failed to process payout");
      }
    } catch (error) {
      console.error("Payout processing error:", error);
      alert("Failed to process payout. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, label: "Pending" },
      assigned: { variant: "default" as const, label: "Assigned" },
      in_progress: { variant: "default" as const, label: "In Progress" },
      completed: { variant: "destructive" as const, label: "Completed" },
      delivered: { variant: "outline" as const, label: "Delivered" },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Clock className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Agent Partnership Dashboard</h1>
          <p className="text-gray-600">
            Manage agent payouts and monitor performance
          </p>
        </div>
        <Button onClick={fetchDashboardData} variant="outline">
          Refresh Data
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 border-b">
        {[
          { id: "overview", label: "Overview", icon: TrendingUp },
          { id: "payouts", label: "Pending Payouts", icon: DollarSign },
          { id: "agents", label: "Agent Management", icon: Users },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2"
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Payouts
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {formatCurrency(dashboardData.totalPendingAmount)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {dashboardData.pendingAgentsCount} agents awaiting payment
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  This Month
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(dashboardData.thisMonthPayouts)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Successful payouts this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Earnings
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {formatCurrency(dashboardData.totalEarnings)}
                </div>
                <p className="text-xs text-muted-foreground">
                  All-time agent earnings
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Agents
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {dashboardData.activeAgentsCount}
                </div>
                <p className="text-xs text-muted-foreground">
                  Currently active specialists
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Payout Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentPayouts
                  .slice(0, 5)
                  .map((payout, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">{payout.agent.name}</p>
                          <p className="text-sm text-gray-600">
                            {payout.agent.specialty} •{" "}
                            {getCountryWithFlag(payout.agent.country)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {payout.completedRequests.length} completed requests
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-red-600">
                          {formatCurrency(payout.pendingCommission)}
                        </p>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Payouts Tab */}
      {activeTab === "payouts" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pending Agent Payouts
              </CardTitle>
            </CardHeader>
            <CardContent>
              {dashboardData.recentPayouts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <p className="text-lg font-medium">All caught up!</p>
                  <p>No pending payouts at the moment.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Agent</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Requests</TableHead>
                      <TableHead>Commission</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dashboardData.recentPayouts.map((payout, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{payout.agent.name}</p>
                            <p className="text-sm text-gray-600">
                              {payout.agent.email}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{payout.agent.specialty}</p>
                            <p className="text-xs text-gray-500">
                              {getCountryWithFlag(payout.agent.country)}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {payout.completedRequests.length} completed
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <p className="font-medium text-green-600">
                            {formatCurrency(payout.pendingCommission)}
                          </p>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setSelectedPayout(payout)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>
                                    Payout Details - {payout.agent.name}
                                  </DialogTitle>
                                  <DialogDescription>
                                    Review and process agent commission payout
                                  </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Agent Information</Label>
                                      <div className="text-sm space-y-1 mt-1">
                                        <p>
                                          <strong>Name:</strong>{" "}
                                          {payout.agent.name}
                                        </p>
                                        <p>
                                          <strong>Email:</strong>{" "}
                                          {payout.agent.email}
                                        </p>
                                        <p>
                                          <strong>Specialty:</strong>{" "}
                                          {payout.agent.specialty}
                                        </p>
                                        <p>
                                          <strong>Region:</strong>{" "}
                                          {payout.agent.region}
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      <Label>Payout Summary</Label>
                                      <div className="text-sm space-y-1 mt-1">
                                        <p>
                                          <strong>Total Commission:</strong>{" "}
                                          {formatCurrency(
                                            payout.pendingCommission
                                          )}
                                        </p>
                                        <p>
                                          <strong>Completed Requests:</strong>{" "}
                                          {payout.completedRequests.length}
                                        </p>
                                        <p>
                                          <strong>Average per Request:</strong>{" "}
                                          {formatCurrency(
                                            payout.pendingCommission /
                                              payout.completedRequests.length
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <Separator />

                                  <div>
                                    <Label>Completed Requests</Label>
                                    <div className="max-h-40 overflow-y-auto mt-2">
                                      <Table>
                                        <TableHeader>
                                          <TableRow>
                                            <TableHead className="text-xs">
                                              Client
                                            </TableHead>
                                            <TableHead className="text-xs">
                                              Service
                                            </TableHead>
                                            <TableHead className="text-xs">
                                              Amount
                                            </TableHead>
                                            <TableHead className="text-xs">
                                              Status
                                            </TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {payout.completedRequests.map(
                                            (request, idx) => (
                                              <TableRow key={idx}>
                                                <TableCell className="text-xs">
                                                  <div>
                                                    <p>{request.clientName}</p>
                                                    <p className="text-gray-500">
                                                      {getCountryWithFlag(
                                                        request.country
                                                      )}
                                                    </p>
                                                  </div>
                                                </TableCell>
                                                <TableCell className="text-xs">
                                                  <Badge
                                                    variant="outline"
                                                    className="text-xs"
                                                  >
                                                    {request.serviceType}
                                                  </Badge>
                                                </TableCell>
                                                <TableCell className="text-xs">
                                                  {formatCurrency(
                                                    request.amount
                                                  )}
                                                </TableCell>
                                                <TableCell className="text-xs">
                                                  {getStatusBadge(
                                                    request.status
                                                  )}
                                                </TableCell>
                                              </TableRow>
                                            )
                                          )}
                                        </TableBody>
                                      </Table>
                                    </div>
                                  </div>

                                  <Separator />

                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label htmlFor="payoutAmount">
                                          Payout Amount
                                        </Label>
                                        <Input
                                          id="payoutAmount"
                                          type="number"
                                          step="0.01"
                                          value={
                                            payoutAmount ||
                                            payout.pendingCommission
                                          }
                                          onChange={(e) =>
                                            setPayoutAmount(e.target.value)
                                          }
                                          placeholder={payout.pendingCommission.toString()}
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="payoutMethod">
                                          Payment Method
                                        </Label>
                                        <Select
                                          value={payoutMethod}
                                          onValueChange={setPayoutMethod}
                                        >
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="bank_transfer">
                                              Bank Transfer
                                            </SelectItem>
                                            <SelectItem value="paypal">
                                              PayPal
                                            </SelectItem>
                                            <SelectItem value="check">
                                              Check
                                            </SelectItem>
                                            <SelectItem value="stripe">
                                              Stripe
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>

                                    <Alert>
                                      <AlertTriangle className="h-4 w-4" />
                                      <AlertDescription>
                                        Processing this payout will mark all
                                        associated requests as paid and send a
                                        notification email to the agent.
                                      </AlertDescription>
                                    </Alert>

                                    <div className="flex justify-end space-x-2">
                                      <Button
                                        variant="outline"
                                        onClick={() => setSelectedPayout(null)}
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          handleProcessPayout(payout)
                                        }
                                        disabled={isProcessing}
                                        className="flex items-center gap-2"
                                      >
                                        <CreditCard className="h-4 w-4" />
                                        {isProcessing
                                          ? "Processing..."
                                          : "Process Payout"}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Button
                              size="sm"
                              onClick={() => handleProcessPayout(payout)}
                              disabled={isProcessing}
                              className="flex items-center gap-1"
                            >
                              <CreditCard className="h-3 w-3" />
                              Pay
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Agents Tab */}
      {activeTab === "agents" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Agent Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Detailed agent management and performance analytics coming soon.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Placeholder for agent cards */}
                <Card className="border-dashed">
                  <CardContent className="pt-6 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Agent Performance</p>
                    <p className="text-xs text-gray-500">
                      Track individual metrics
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-dashed">
                  <CardContent className="pt-6 text-center">
                    <Mail className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Communication</p>
                    <p className="text-xs text-gray-500">
                      Message agents directly
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-dashed">
                  <CardContent className="pt-6 text-center">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Reports</p>
                    <p className="text-xs text-gray-500">
                      Generate performance reports
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
