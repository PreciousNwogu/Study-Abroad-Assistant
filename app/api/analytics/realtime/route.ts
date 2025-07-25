import { NextResponse } from "next/server";
import { AnalyticsService } from "../../../../lib/analytics";

export async function GET() {
  try {
    const realtimeData = AnalyticsService.getRealtimeStats();
    return NextResponse.json(realtimeData);
  } catch (error) {
    console.error("Realtime analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch realtime data" },
      { status: 500 }
    );
  }
}
