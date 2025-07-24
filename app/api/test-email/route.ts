import { testEmailConfig, sendTestEmail } from "@/lib/email-service";

export async function POST(req: Request) {
  try {
    const { email, action = "test" } = await req.json();

    console.log("🧪 Email test endpoint called with action:", action);

    if (action === "config") {
      // Test email configuration
      const isValid = await testEmailConfig();
      return Response.json({
        success: isValid,
        message: isValid
          ? "Email configuration is valid"
          : "Email configuration failed",
        timestamp: new Date().toISOString(),
      });
    }

    if (action === "send" && email) {
      // Send test email
      const result = await sendTestEmail(email);
      return Response.json(result);
    }

    return Response.json(
      {
        success: false,
        message:
          "Invalid action. Use 'config' to test configuration or 'send' with email to send test email",
        timestamp: new Date().toISOString(),
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("❌ Email test endpoint error:", error);
    return Response.json(
      {
        success: false,
        message: `Test failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
