import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage your Study Abroad Assistant platform
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">User Management</h3>
            <p className="text-gray-600 mb-4">
              View and manage user accounts and submissions
            </p>
            <Button className="w-full">View Users</Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">SOP Requests</h3>
            <p className="text-gray-600 mb-4">
              Review and manage SOP writing requests
            </p>
            <Button className="w-full">View Requests</Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Email Analytics</h3>
            <p className="text-gray-600 mb-4">
              Monitor email deliverability and engagement
            </p>
            <Button className="w-full">View Analytics</Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">University Database</h3>
            <p className="text-gray-600 mb-4">
              Manage university listings and information
            </p>
            <Button className="w-full">Manage Universities</Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Agent Payouts</h3>
            <p className="text-gray-600 mb-4">
              Process payments and manage agent commissions
            </p>
            <Button className="w-full">Process Payouts</Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">System Settings</h3>
            <p className="text-gray-600 mb-4">
              Configure platform settings and preferences
            </p>
            <Button className="w-full">Settings</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
