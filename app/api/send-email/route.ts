import {
  sendEmail,
  sendAgentAssignmentEmail,
  sendClientConfirmationEmail,
  sendAgentPayoutEmail,
} from "@/lib/email-service";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { generateUniversityListPDF } from "@/lib/pdf-generator";
import { getCountryWithFlag } from "@/lib/country-utils";

export async function POST(req: Request) {
  try {
    const requestData = await req.json();

    // Check if this is a specific email type
    if (requestData.type) {
      return await handleSpecificEmailType(requestData);
    }

    // Legacy university recommendation email handling
    const { email, userData, recommendations, includePDF = true } = requestData;

    console.log("📧 Send Email API called with:", {
      email,
      country: userData?.country,
      course: userData?.course,
      includePDF,
    });

    // If recommendations aren't provided, generate them
    let universityList = recommendations;
    if (!universityList) {
      console.log("🔍 Generating university recommendations...");
      universityList = await generateUniversityRecommendations(userData);
    }

    // Create university list content
    const emailContent = createUniversityListEmail(
      userData,
      universityList,
      includePDF
    );

    // Prepare email data
    const emailData: any = {
      to: email,
      subject: `Your University List for ${userData.course} in ${userData.country}`,
      html: emailContent,
    };

    // Generate PDF attachment if requested
    if (includePDF) {
      try {
        console.log("📄 Generating PDF attachment...");
        const pdfBuffer = await generateUniversityListPDF(
          userData,
          universityList
        );
        emailData.attachments = [
          {
            filename: `University_List_${
              userData.country
            }_${userData.course.replace(/\s+/g, "_")}.pdf`,
            content: pdfBuffer,
            contentType: "application/pdf",
          },
        ];
        console.log("✅ PDF generated successfully");
      } catch (pdfError) {
        console.warn("❌ Failed to generate PDF attachment:", pdfError);
        // Continue sending email without PDF attachment
      }
    }

    // Send email
    console.log("📤 Sending email...");
    const result = await sendEmail(emailData);
    console.log("📧 Email result:", result);

    return Response.json(result);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return Response.json(
      {
        error: "Failed to send email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

async function handleSpecificEmailType(requestData: any) {
  const { type } = requestData;

  try {
    let result;

    switch (type) {
      case "agent_assignment":
        result = await sendAgentAssignmentEmail({
          to: requestData.to,
          agentName: requestData.agentName,
          clientName: requestData.clientName,
          clientEmail: requestData.clientEmail,
          serviceType: requestData.serviceType,
          country: requestData.country,
          urgency: requestData.urgency,
          requestId: requestData.requestId,
          clientDetails: requestData.clientDetails,
        });
        break;

      case "client_confirmation":
        result = await sendClientConfirmationEmail({
          to: requestData.to,
          clientName: requestData.clientName,
          agentName: requestData.agentName,
          agentSpecialty: requestData.agentSpecialty,
          serviceType: requestData.serviceType,
          country: requestData.country,
          urgency: requestData.urgency,
          requestId: requestData.requestId,
          estimatedDelivery: requestData.estimatedDelivery,
        });
        break;

      case "agent_payout":
        result = await sendAgentPayoutEmail({
          to: requestData.to,
          agentName: requestData.agentName,
          payoutAmount: requestData.payoutAmount,
          requestCount: requestData.requestCount,
          payoutMethod: requestData.payoutMethod,
          payoutDate: requestData.payoutDate,
        });
        break;

      default:
        throw new Error(`Unknown email type: ${type}`);
    }

    console.log(`📧 ${type} email result:`, result);
    return Response.json(result);
  } catch (error) {
    console.error(`❌ Error sending ${type} email:`, error);
    return Response.json(
      {
        error: `Failed to send ${type} email`,
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
async function generateUniversityRecommendations(userData: any) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return "University recommendations not available - API key missing";
  }

  try {
    const prompt = `Generate a structured list of 5 specific universities in ${userData.country} for ${userData.course} studies at ${userData.level} level with ${userData.budget} budget. 

For each university, provide:
- University name and city
- Estimated tuition fees 
- Why it's suitable for ${userData.course}
- Key advantages/programs
- Website URL (realistic format)
- Admissions email (realistic format)

Format as a simple numbered list with clear sections for each university.`;

    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt,
      system: `You are a study abroad consultant. Provide real, accurate university recommendations for ${userData.country}. Be specific and helpful.`,
    });

    return text;
  } catch (error) {
    console.error("Error generating university recommendations:", error);
    return "University recommendations temporarily unavailable";
  }
}

function createUniversityListEmail(
  userData: any,
  recommendations: string,
  hasPDF: boolean = false
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your University List</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px; margin-bottom: 30px; }
    .recommendations { background: #f8f9fa; border: 1px solid #dee2e6; padding: 20px; border-radius: 5px; margin: 20px 0; white-space: pre-line; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; }
    .next-steps { background: #e8f4fd; padding: 20px; border-radius: 5px; margin-top: 30px; }
    .contact { background: #f0f0f0; padding: 20px; border-radius: 5px; margin-top: 20px; }
    .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎓 Your University List</h1>
    <p>Personalized recommendations for ${
      userData.course
    } in ${getCountryWithFlag(userData.country)}</p>
  </div>

  <p>Dear Future Student,</p>
  
  <p>Thank you for using <strong>Study Abroad Assistant</strong>! Based on your preferences for <strong>${
    userData.course
  }</strong> in <strong>${getCountryWithFlag(
    userData.country
  )}</strong> with a <strong>${
    userData.budget
  }</strong> budget, here are our AI-powered university recommendations:</p>

  ${
    hasPDF
      ? `
  <div style="background: #e8f4fd; border: 1px solid #bee5eb; padding: 15px; border-radius: 5px; margin: 15px 0;">
    <h3>📎 Documents Attached:</h3>
    <p><strong>📄 University List PDF:</strong> A downloadable, printable version of your personalized university recommendations with detailed information for each institution.</p>
  </div>
  `
      : ""
  }

  <div class="recommendations">
${recommendations}
  </div>

  <div class="next-steps">
    <h2>📋 Next Steps Checklist</h2>
    <ul>
      <li>✅ Research each university's specific admission requirements</li>
      <li>✅ Check application deadlines (typically 6-12 months in advance)</li>
      <li>✅ Prepare required documents (transcripts, test scores, SOP)</li>
      <li>✅ Look into scholarship opportunities</li>
      <li>✅ Connect with current students or alumni</li>
      <li>✅ Visit university websites and attend virtual information sessions</li>
    </ul>
  </div>

  <div class="contact">
    <h2>📞 Need Help With Your Application?</h2>
    <p>Our professional team is here to assist you:</p>
    <ul>
      <li><strong>📧 Email:</strong> contact@studyabroadassistant@gmail.com</li>
      <li><strong>📱 WhatsApp:</strong> +1 (555) 123-4567</li>
      <li><strong>🌐 Website:</strong> www.studyabroadassistant.com</li>
    </ul>
    
    <h3>🎯 Premium Services Available:</h3>
    <ul>
      <li>Statement of Purpose writing and review ($99)</li>
      <li>Application guidance and support ($199)</li>
      <li>Scholarship application assistance ($149)</li>
      <li>Interview preparation ($129)</li>
      <li>Complete application package ($399)</li>
    </ul>
  </div>

  <div class="footer">
    <p><strong>Study Abroad Assistant Team</strong></p>
    <p>🌟 Making your educational dreams come true 🌟</p>
    <p><small>This email was sent from Study Abroad Assistant. For questions, reply to this email or contact us directly.</small></p>
  </div>
</body>
</html>
  `;
}
