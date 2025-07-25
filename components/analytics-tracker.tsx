"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Simple client-side analytics tracker
export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Generate session ID if not exists
    let sessionId = sessionStorage.getItem("analytics-session");
    if (!sessionId) {
      sessionId = Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem("analytics-session", sessionId);
    }

    // Track page view
    const trackPageView = async () => {
      try {
        await fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "pageview",
            page: pathname,
            sessionId,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (error) {
        console.error("Analytics tracking failed:", error);
      }
    };

    trackPageView();
  }, [pathname]);

  // Track errors globally
  useEffect(() => {
    const handleError = async (event: ErrorEvent) => {
      const sessionId = sessionStorage.getItem("analytics-session");
      if (!sessionId) return;

      try {
        await fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "error",
            message: event.message,
            page: window.location.pathname,
            sessionId,
          }),
        });
      } catch (error) {
        console.error("Error tracking failed:", error);
      }
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  return null; // This component doesn't render anything
}

// Helper function to track API calls manually
export async function trackApiCall(endpoint: string, responseTime?: number) {
  const sessionId = sessionStorage.getItem("analytics-session");
  if (!sessionId) return;

  try {
    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "api",
        endpoint,
        sessionId,
        responseTime,
      }),
    });
  } catch (error) {
    console.error("API tracking failed:", error);
  }
}
