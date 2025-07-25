// Simple in-memory analytics storage - No database needed!
interface PageView {
  id: string;
  page: string;
  timestamp: Date;
  userAgent?: string;
  country?: string;
  sessionId: string;
  ip?: string;
}

interface Session {
  id: string;
  sessionId: string;
  startTime: Date;
  lastActivity: Date;
  pageCount: number;
  country?: string;
  userAgent?: string;
}

interface ApiCall {
  id: string;
  endpoint: string;
  timestamp: Date;
  sessionId?: string;
  responseTime?: number;
}

interface ErrorLog {
  id: string;
  message: string;
  page: string;
  timestamp: Date;
  sessionId?: string;
}

interface AnalyticsStore {
  pageViews: PageView[];
  sessions: Map<string, Session>;
  apiCalls: ApiCall[];
  errors: ErrorLog[];
}

// In-memory storage (perfect for getting started)
const analytics: AnalyticsStore = {
  pageViews: [],
  sessions: new Map(),
  apiCalls: [],
  errors: [],
};

// Helper functions
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function getCountryFromIP(ip?: string): string {
  // Mock country detection - in production use ipapi.co or similar
  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Netherlands",
    "Singapore",
    "Nigeria",
    "South Africa",
    "India",
    "Brazil",
  ];
  return countries[Math.floor(Math.random() * countries.length)];
}

export class AnalyticsService {
  // Track page views (app growth metric)
  static trackPageView(data: {
    page: string;
    sessionId: string;
    userAgent?: string;
    ip?: string;
  }) {
    const pageView: PageView = {
      id: generateId(),
      page: data.page,
      timestamp: new Date(),
      userAgent: data.userAgent,
      sessionId: data.sessionId,
      ip: data.ip,
      country: getCountryFromIP(data.ip),
    };

    analytics.pageViews.push(pageView);

    // Update or create session (for session time tracking)
    let session = analytics.sessions.get(data.sessionId);
    if (session) {
      session.lastActivity = new Date();
      session.pageCount++;
    } else {
      session = {
        id: generateId(),
        sessionId: data.sessionId,
        startTime: new Date(),
        lastActivity: new Date(),
        pageCount: 1,
        country: pageView.country,
        userAgent: data.userAgent,
      };
      analytics.sessions.set(data.sessionId, session);
    }

    // Keep memory manageable
    if (analytics.pageViews.length > 1000) {
      analytics.pageViews = analytics.pageViews.slice(-1000);
    }

    return pageView;
  }

  // Track API calls (OpenAI usage monitoring)
  static trackApiCall(data: {
    endpoint: string;
    sessionId?: string;
    responseTime?: number;
  }) {
    const apiCall: ApiCall = {
      id: generateId(),
      endpoint: data.endpoint,
      timestamp: new Date(),
      sessionId: data.sessionId,
      responseTime: data.responseTime,
    };

    analytics.apiCalls.push(apiCall);

    // Keep memory manageable
    if (analytics.apiCalls.length > 500) {
      analytics.apiCalls = analytics.apiCalls.slice(-500);
    }

    return apiCall;
  }

  // Track errors (issue detection)
  static trackError(data: {
    message: string;
    page: string;
    sessionId?: string;
  }) {
    const error: ErrorLog = {
      id: generateId(),
      message: data.message,
      page: data.page,
      timestamp: new Date(),
      sessionId: data.sessionId,
    };

    analytics.errors.push(error);

    // Keep memory manageable
    if (analytics.errors.length > 100) {
      analytics.errors = analytics.errors.slice(-100);
    }

    return error;
  }

  // Get comprehensive stats for dashboard
  static getStats() {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const lastHour = new Date(now.getTime() - 60 * 60 * 1000);

    // Filter recent data
    const recentPageViews = analytics.pageViews.filter(
      (pv) => pv.timestamp >= last24Hours
    );
    const recentSessions = Array.from(analytics.sessions.values()).filter(
      (s) => s.lastActivity >= last24Hours
    );
    const recentApiCalls = analytics.apiCalls.filter(
      (call) => call.timestamp >= last24Hours
    );
    const recentErrors = analytics.errors.filter(
      (err) => err.timestamp >= last24Hours
    );

    // 🧍‍♀️ Total visitors (unique sessions)
    const totalVisitors = recentSessions.length;

    // ⌛ Average session time (engagement metric)
    const avgSessionTime =
      recentSessions.length > 0
        ? recentSessions.reduce((sum, session) => {
            const duration =
              (session.lastActivity.getTime() - session.startTime.getTime()) /
              1000 /
              60;
            return sum + Math.max(duration, 0);
          }, 0) / recentSessions.length
        : 0;

    // 🌎 Top countries (localization insights)
    const countryStats = recentPageViews.reduce((acc, pv) => {
      if (pv.country) {
        acc[pv.country] = (acc[pv.country] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const topCountries = Object.entries(countryStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([country, count]) => ({ country, count }));

    // 💬 API usage count (OpenAI monitoring)
    const apiUsage = recentApiCalls.length;
    const topApiEndpoints = recentApiCalls.reduce((acc, call) => {
      acc[call.endpoint] = (acc[call.endpoint] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // ⚠️ Error count (issue detection)
    const errorCount = recentErrors.length;

    // 📈 Traffic spikes (marketing success)
    const trafficLastHour = analytics.pageViews.filter(
      (pv) => pv.timestamp >= lastHour
    ).length;
    const isTrafficSpike = trafficLastHour > recentPageViews.length / 24; // Above hourly average

    // Top pages
    const pageStats = recentPageViews.reduce((acc, pv) => {
      acc[pv.page] = (acc[pv.page] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topPages = Object.entries(pageStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([page, count]) => ({ page, count }));

    return {
      // Core metrics you requested
      totalVisitors,
      avgSessionTime: Math.round(avgSessionTime * 10) / 10, // Round to 1 decimal
      topCountries,
      apiUsage,
      errorCount,
      isTrafficSpike,
      trafficLastHour,

      // Additional useful data
      pageViews: recentPageViews.length,
      topPages,
      topApiEndpoints: Object.entries(topApiEndpoints)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([endpoint, count]) => ({ endpoint, count })),

      // Recent activity for real-time feeling
      recentActivity: {
        lastHour: trafficLastHour,
        errors: recentErrors.length,
        apiCalls: recentApiCalls.filter((call) => call.timestamp >= lastHour)
          .length,
      },
    };
  }

  // Get real-time stats for live updates
  static getRealtimeStats() {
    const now = new Date();
    const last5Minutes = new Date(now.getTime() - 5 * 60 * 1000);

    const activeSessions = Array.from(analytics.sessions.values()).filter(
      (s) => s.lastActivity >= last5Minutes
    );

    const recentActivity = analytics.pageViews
      .filter((pv) => pv.timestamp >= last5Minutes)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 5)
      .map((pv) => ({
        page: pv.page,
        country: pv.country,
        timestamp: pv.timestamp.toISOString(),
      }));

    return {
      activeSessions: activeSessions.length,
      recentActivity,
      timestamp: now.toISOString(),
    };
  }

  // Cleanup old data (call this periodically)
  static cleanup() {
    const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days

    analytics.pageViews = analytics.pageViews.filter(
      (pv) => pv.timestamp >= cutoff
    );
    analytics.apiCalls = analytics.apiCalls.filter(
      (call) => call.timestamp >= cutoff
    );
    analytics.errors = analytics.errors.filter(
      (err) => err.timestamp >= cutoff
    );

    for (const [sessionId, session] of analytics.sessions.entries()) {
      if (session.lastActivity < cutoff) {
        analytics.sessions.delete(sessionId);
      }
    }
  }
}
