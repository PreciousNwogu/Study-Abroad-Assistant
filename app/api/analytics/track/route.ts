import { NextRequest, NextResponse } from "next/server";
import { AnalyticsService } from "../../../../lib/analytics";

export async function POST(request: NextRequest) {
  try {
    const { type, ...data } = await request.json();

    switch (type) {
      case "pageview":
        await AnalyticsService.trackPageView({
          page: data.page || "/",
          sessionId: data.sessionId,
          userAgent: data.userAgent,
          ip: data.ip,
        });
        break;

      case "api":
        await AnalyticsService.trackApiCall({
          endpoint: data.endpoint,
          sessionId: data.sessionId,
          responseTime: data.responseTime,
        });
        break;

      case "error":
        await AnalyticsService.trackError({
          message: data.message,
          page: data.page,
          sessionId: data.sessionId,
        });
        break;

      default:
        return NextResponse.json(
          { error: "Invalid tracking type" },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics tracking error:", error);
    return NextResponse.json({ success: false });
  }
}
