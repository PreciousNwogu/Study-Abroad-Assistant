"use client";

import { useState, useEffect } from "react";

interface AnalyticsData {
  totalVisitors: number;
  avgSessionTime: number;
  topCountries: Array<{ country: string; count: number }>;
  apiUsage: number;
  errorCount: number;
  isTrafficSpike: boolean;
  trafficLastHour: number;
  pageViews: number;
  topPages: Array<{ page: string; count: number }>;
  topApiEndpoints: Array<{ endpoint: string; count: number }>;
  recentActivity: {
    lastHour: number;
    errors: number;
    apiCalls: number;
  };
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchData = async () => {
    try {
      console.log("🔄 Fetching analytics data...");
      const response = await fetch("/api/analytics/stats");
      console.log("📡 Response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Data received:", result);
        setData(result);
        setLastUpdated(new Date());
      } else {
        console.error(
          "❌ Response not OK:",
          response.status,
          response.statusText
        );
        const errorText = await response.text();
        console.error("❌ Error response:", errorText);
      }
    } catch (error) {
      console.error("❌ Failed to fetch analytics data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">📊 Analytics Dashboard</h1>
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  const getTrafficStatusColor = () => {
    if (data?.isTrafficSpike) return "text-green-600";
    if ((data?.trafficLastHour ?? 0) > 5) return "text-blue-600";
    return "text-gray-600";
  };

  const getTrafficStatus = () => {
    if (data?.isTrafficSpike) return "🔥 Traffic Spike!";
    if ((data?.trafficLastHour ?? 0) > 5) return "📈 Active";
    return "📊 Normal";
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📊 Analytics Dashboard
          </h1>
          <p className="text-gray-600 mb-2">
            Study Abroad Assistant - Real-time Insights
          </p>
          <p className="text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()} • Auto-refreshes
            every 30s
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* 🧍‍♀️ Total Visitors */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">
                Total Visitors
              </h3>
              <span className="text-2xl">🧍‍♀️</span>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {data?.totalVisitors || 0}
            </div>
            <p className="text-xs text-gray-500">Unique sessions (24h)</p>
            <div className="mt-2 text-xs text-blue-600 font-medium">
              📈 App Growth Metric
            </div>
          </div>

          {/* ⌛ Avg Session Time */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">
                Avg Session Time
              </h3>
              <span className="text-2xl">⌛</span>
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {data?.avgSessionTime || 0}m
            </div>
            <p className="text-xs text-gray-500">Minutes per session</p>
            <div className="mt-2 text-xs text-purple-600 font-medium">
              💡 User Engagement
            </div>
          </div>

          {/* 💬 API Usage */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">API Calls</h3>
              <span className="text-2xl">💬</span>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {data?.apiUsage || 0}
            </div>
            <p className="text-xs text-gray-500">OpenAI API calls (24h)</p>
            <div className="mt-2 text-xs text-green-600 font-medium">
              💰 Usage Monitoring
            </div>
          </div>

          {/* ⚠️ Errors */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Error Count</h3>
              <span className="text-2xl">⚠️</span>
            </div>
            <div
              className={`text-3xl font-bold mb-2 ${
                (data?.errorCount ?? 0) > 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {data?.errorCount || 0}
            </div>
            <p className="text-xs text-gray-500">Issues detected (24h)</p>
            <div className="mt-2 text-xs text-red-600 font-medium">
              🔍 Issue Detection
            </div>
          </div>

          {/* 📈 Traffic Status */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">
                Traffic Status
              </h3>
              <span className="text-2xl">📈</span>
            </div>
            <div
              className={`text-2xl font-bold mb-2 ${getTrafficStatusColor()}`}
            >
              {getTrafficStatus()}
            </div>
            <p className="text-xs text-gray-500">
              {data?.trafficLastHour || 0} views last hour
            </p>
            <div className="mt-2 text-xs text-orange-600 font-medium">
              🎯 Marketing Success
            </div>
          </div>

          {/* 👀 Page Views */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Page Views</h3>
              <span className="text-2xl">�</span>
            </div>
            <div className="text-3xl font-bold text-indigo-600 mb-2">
              {data?.pageViews || 0}
            </div>
            <p className="text-xs text-gray-500">Total views (24h)</p>
            <div className="mt-2 text-xs text-indigo-600 font-medium">
              📊 Content Performance
            </div>
          </div>
        </div>

        {/* Detailed Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 🌎 Country Insights */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              🌎 Countries (Localization Insights)
            </h3>
            {data?.topCountries && data.topCountries.length > 0 ? (
              <div className="space-y-3">
                {data.topCountries.map((country, index) => (
                  <div
                    key={country.country}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        #{index + 1}
                      </span>
                      <span className="font-medium">{country.country}</span>
                    </div>
                    <span className="text-sm text-gray-600 font-semibold">
                      {country.count} visitors
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <span className="text-4xl block mb-2">🌍</span>
                <p>No country data yet</p>
                <p className="text-xs">Data will appear as users visit</p>
              </div>
            )}
          </div>

          {/* 📄 Top Pages */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              📄 Popular Pages
            </h3>
            {data?.topPages && data.topPages.length > 0 ? (
              <div className="space-y-3">
                {data.topPages.map((page, index) => (
                  <div
                    key={page.page}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded">
                        #{index + 1}
                      </span>
                      <span className="font-mono text-sm">{page.page}</span>
                    </div>
                    <span className="text-sm text-gray-600 font-semibold">
                      {page.count} views
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <span className="text-4xl block mb-2">📊</span>
                <p>No page data yet</p>
                <p className="text-xs">Data will appear as pages are visited</p>
              </div>
            )}
          </div>
        </div>

        {/* Status Footer */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl">
          <div className="flex items-center justify-between">
            <p className="text-sm text-blue-700 font-medium">
              ✅ Analytics Dashboard Active - Tracking your key metrics in
              real-time
            </p>
            <button
              onClick={fetchData}
              className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full transition-colors"
            >
              🔄 Refresh Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
