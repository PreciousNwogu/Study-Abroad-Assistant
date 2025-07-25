import { NextResponse } from "next/server";
import { AnalyticsService } from "../../../../lib/analytics";

export async function GET() {
  try {
    console.log("📊 Analytics stats API called");
    const stats = AnalyticsService.getStats();
    console.log("📊 Stats retrieved:", JSON.stringify(stats, null, 2));
    
    return NextResponse.json({
      ...stats,
      _meta: {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        apiStatus: 'healthy'
      }
    });
  } catch (error) {
    console.error("❌ Analytics stats error:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch analytics",
        details: String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
