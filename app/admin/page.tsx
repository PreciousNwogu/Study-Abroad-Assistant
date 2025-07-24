"use client";

import { EnhancedAdminDashboard } from "@/components/enhanced-admin-dashboard";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <EnhancedAdminDashboard />
      </div>
    </div>
  );
}
