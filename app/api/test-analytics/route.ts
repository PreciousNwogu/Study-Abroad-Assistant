import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test that the API is working
    return NextResponse.json({
      message: "Analytics API is working!",
      timestamp: new Date().toISOString(),
      status: "healthy",
    });
  } catch (error) {
    console.error("Test API error:", error);
    return NextResponse.json(
      { error: "Test API failed", details: String(error) },
      { status: 500 }
    );
  }
}
