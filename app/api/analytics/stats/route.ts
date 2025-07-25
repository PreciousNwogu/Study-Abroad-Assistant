import { NextResponse } from "next/server";
import { AnalyticsService } from "../../../../lib/analytics";

export async function GET() {
  try {
    const stats = AnalyticsService.getStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Analytics stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
