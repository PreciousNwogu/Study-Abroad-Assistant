"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function AdminPayoutDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Agent Payout Dashboard</h2>
        <Button>Process All Payouts</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Pending Payouts</h3>
          <p className="text-3xl font-bold text-blue-600">$2,450</p>
          <p className="text-sm text-gray-600">12 agents awaiting payment</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">This Month</h3>
          <p className="text-3xl font-bold text-green-600">$8,920</p>
          <p className="text-sm text-gray-600">34 successful payouts</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Earned</h3>
          <p className="text-3xl font-bold text-purple-600">$47,380</p>
          <p className="text-sm text-gray-600">All-time agent earnings</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Payout Requests</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Agent #A001</p>
              <p className="text-sm text-gray-600">3 successful referrals</p>
            </div>
            <div className="text-right">
              <p className="font-medium">$447.00</p>
              <Badge variant="outline">Pending</Badge>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Agent #A002</p>
              <p className="text-sm text-gray-600">2 successful referrals</p>
            </div>
            <div className="text-right">
              <p className="font-medium">$298.00</p>
              <Badge variant="outline">Pending</Badge>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Agent #A003</p>
              <p className="text-sm text-gray-600">5 successful referrals</p>
            </div>
            <div className="text-right">
              <p className="font-medium">$745.00</p>
              <Badge variant="secondary">Processed</Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
