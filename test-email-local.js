require("dotenv").config({ path: ".env.local" });

const { sendEmail } = require("./lib/email-service.ts");

async function testEmail() {
  console.log("Testing email configuration...");
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Set" : "Not set");

  try {
    const result = await sendEmail({
      to: "studyabroadassistant@gmail.com",
      subject: "Test Email - Configuration Check",
      html: "<h1>Test Email</h1><p>This is a test to verify email configuration is working.</p>",
    });

    console.log("Email result:", result);
  } catch (error) {
    console.error("Email error:", error);
  }
}

testEmail();
