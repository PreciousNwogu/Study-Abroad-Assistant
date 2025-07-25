"use client";

import { useState, useEffect } from "react";

interface RealtimeData {
  activeSessions: number;
  recentPageViews: number;
  recentApiCalls: number;
  recentErrors: number;
  recentErrorsList: Array<{ message: string; page: string; createdAt: string }>;
  timestamp: string;
}

export default function RealtimeDashboard() {
  const [realtimeData, setRealtimeData] = useState<RealtimeData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRealtimeData = async () => {
    try {
      const response = await fetch("/api/analytics/realtime");
      if (response.ok) {
        const data = await response.json();
        setRealtimeData(data);
      }
    } catch (error) {
      console.error("Failed to fetch realtime data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealtimeData();

    // Update every 30 seconds
    const interval = setInterval(fetchRealtimeData, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-lg font-semibold mb-4">🔴 Live Analytics</h3>
        <div className="animate-pulse">Loading real-time data...</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">🔴 Live Analytics</h3>
        <span className="text-xs text-gray-500">
          Updated:{" "}
          {realtimeData?.timestamp
            ? new Date(realtimeData.timestamp).toLocaleTimeString()
            : "Never"}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-green-50 rounded">
          <div className="text-2xl font-bold text-green-600">
            {realtimeData?.activeSessions || 0}
          </div>
          <div className="text-xs text-green-700">Active Sessions</div>
        </div>

        <div className="text-center p-3 bg-blue-50 rounded">
          <div className="text-2xl font-bold text-blue-600">
            {realtimeData?.recentPageViews || 0}
          </div>
          <div className="text-xs text-blue-700">Recent Views</div>
        </div>

        <div className="text-center p-3 bg-purple-50 rounded">
          <div className="text-2xl font-bold text-purple-600">
            {realtimeData?.recentApiCalls || 0}
          </div>
          <div className="text-xs text-purple-700">API Calls</div>
        </div>

        <div className="text-center p-3 bg-red-50 rounded">
          <div className="text-2xl font-bold text-red-600">
            {realtimeData?.recentErrors || 0}
          </div>
          <div className="text-xs text-red-700">Errors</div>
        </div>
      </div>

      {realtimeData?.recentErrorsList &&
        realtimeData.recentErrorsList.length > 0 && (
          <div>
            <h4 className="font-medium text-red-600 mb-2">Recent Errors:</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {realtimeData.recentErrorsList.slice(0, 3).map((error, index) => (
                <div
                  key={index}
                  className="text-sm p-2 bg-red-50 border border-red-200 rounded"
                >
                  <div className="font-medium text-red-800">
                    {error.message}
                  </div>
                  <div className="text-red-600">Page: {error.page}</div>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}
