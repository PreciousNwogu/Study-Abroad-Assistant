import nodemailer from "nodemailer";

interface EmailAttachment {
  filename: string;
  content: Buffer;
  contentType: string;
}

interface EmailData {
  to: string;
  subject: string;
  html: string;
  attachments?: EmailAttachment[];
}

interface EmailResult {
  success: boolean;
  message: string;
  timestamp: string;
  messageId?: string;
}

// Create transporter using Gmail SMTP
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.warn(
      "⚠️  EMAIL_USER or EMAIL_PASS not configured. Emails will be logged only."
    );
    return null;
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: emailUser,
      pass: emailPass, // This should be an App Password, not your regular Gmail password
    },
    tls: {
      rejectUnauthorized: false,
    },
    debug: true, // Enable debug mode
    logger: true, // Enable logging
  });
};

export async function sendEmail(emailData: EmailData): Promise<EmailResult> {
  const timestamp = new Date().toISOString();

  try {
    console.log("📧 Attempting to send email to:", emailData.to);
    console.log("📋 Subject:", emailData.subject);
    console.log("📎 Attachments:", emailData.attachments?.length || 0);

    const transporter = createTransporter();

    if (!transporter) {
      // Fallback: Log email content to console if no credentials
      console.log("📧 EMAIL CONTENT (No SMTP configured):");
      console.log("To:", emailData.to);
      console.log("Subject:", emailData.subject);
      console.log("HTML Length:", emailData.html.length, "characters");
      console.log("Attachments:", emailData.attachments?.length || 0);

      return {
        success: true,
        message: `Email logged to console (SMTP not configured) for ${emailData.to}`,
        timestamp,
      };
    }

    // Prepare mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
      attachments: emailData.attachments?.map((att) => ({
        filename: att.filename,
        content: att.content,
        contentType: att.contentType,
      })),
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully!");
    console.log("📧 Message ID:", info.messageId);
    console.log("📬 Accepted:", info.accepted);
    console.log("❌ Rejected:", info.rejected);

    return {
      success: true,
      message: `Email sent successfully to ${emailData.to}`,
      timestamp,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("❌ Failed to send email:", error);

    // Provide specific error messages for common issues
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;

      // Check for specific error patterns
      if (error.message.includes("ECONNREFUSED")) {
        errorMessage =
          "Connection refused - Check your internet connection and Gmail SMTP settings";
      } else if (error.message.includes("Invalid login")) {
        errorMessage =
          "Invalid credentials - Please check your Gmail address and App Password";
      } else if (error.message.includes("530")) {
        errorMessage =
          "Authentication required - Ensure 2-Step Verification is enabled and you are using an App Password";
      }
    }

    console.error("🔍 Detailed error:", {
      message: errorMessage,
      code: (error as any)?.code,
      command: (error as any)?.command,
      response: (error as any)?.response,
    });

    return {
      success: false,
      message: `Failed to send email: ${errorMessage}`,
      timestamp,
    };
  }
}

// Test email configuration
export async function testEmailConfig(): Promise<boolean> {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.log("⚠️  Email not configured - using console logging mode");
      return false;
    }

    console.log("🔍 Testing email configuration...");
    await transporter.verify();
    console.log("✅ Email configuration is valid");
    return true;
  } catch (error) {
    console.error("❌ Email configuration test failed:", error);

    if (error instanceof Error) {
      if (error.message.includes("ECONNREFUSED")) {
        console.error("🚫 Connection refused - This could be:");
        console.error("   • Firewall blocking SMTP connections");
        console.error("   • Network/ISP blocking port 587");
        console.error("   • Corporate network restrictions");
        console.error("   • Try using mobile hotspot to test");
      }
    }

    return false;
  }
}

// Simple test email function
export async function sendTestEmail(to: string): Promise<EmailResult> {
  const testEmailData: EmailData = {
    to,
    subject: "Test Email from Study Abroad Assistant",
    html: `
      <h2>🎉 Email Test Successful!</h2>
      <p>If you received this email, your email configuration is working correctly.</p>
      <p><strong>Test completed at:</strong> ${new Date().toLocaleString()}</p>
    `,
  };

  return await sendEmail(testEmailData);
}

// Agent assignment notification email
export async function sendAgentAssignmentEmail(data: {
  to: string;
  agentName: string;
  clientName: string;
  clientEmail: string;
  serviceType: string;
  country: string;
  urgency: string;
  requestId: string;
  clientDetails: any;
}): Promise<EmailResult> {
  const urgencyBadge = {
    standard: { color: "#10B981", text: "Standard (7-10 days)" },
    priority: { color: "#F59E0B", text: "Priority (3-5 days)" },
    urgent: { color: "#EF4444", text: "Urgent (24-48 hours)" },
  };

  const urgencyInfo =
    urgencyBadge[data.urgency as keyof typeof urgencyBadge] ||
    urgencyBadge.standard;

  const emailData: EmailData = {
    to: data.to,
    subject: `New ${
      data.serviceType === "visa" ? "Visa" : "Admission"
    } SOP Assignment - ${data.clientName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .card { background: #f8f9fa; border-left: 4px solid #667eea; padding: 15px; margin: 15px 0; }
          .urgency-badge { 
            display: inline-block; 
            background: ${urgencyInfo.color}; 
            color: white; 
            padding: 5px 10px; 
            border-radius: 20px; 
            font-size: 12px; 
            font-weight: bold;
          }
          .details { background: white; border: 1px solid #e9ecef; border-radius: 8px; padding: 15px; margin: 15px 0; }
          .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }
          .cta-button { 
            display: inline-block; 
            background: #667eea; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎯 New SOP Assignment</h1>
          <p>You have been assigned a new ${data.serviceType} SOP request</p>
        </div>
        
        <div class="content">
          <p>Hello <strong>${data.agentName}</strong>,</p>
          
          <p>A new ${
            data.serviceType === "visa"
              ? "student visa"
              : "university admission"
          } SOP request has been assigned to you. Please review the details below and begin working on the statement of purpose.</p>
          
          <div class="card">
            <h3>📋 Request Summary</h3>
            <p><strong>Request ID:</strong> ${data.requestId}</p>
            <p><strong>Client:</strong> ${data.clientName}</p>
            <p><strong>Email:</strong> ${data.clientEmail}</p>
            <p><strong>Target Country:</strong> ${data.country}</p>
            <p><strong>Service Type:</strong> ${
              data.serviceType === "visa"
                ? "Student Visa SOP"
                : "University Admission SOP"
            }</p>
            <p><strong>Urgency:</strong> <span class="urgency-badge">${
              urgencyInfo.text
            }</span></p>
          </div>

          <div class="details">
            <h3>👤 Client Details</h3>
            <p><strong>Intended Program:</strong> ${
              data.clientDetails.intendedProgram || "Not specified"
            }</p>
            <p><strong>Current Education:</strong> ${
              data.clientDetails.currentEducation || "Not specified"
            }</p>
            <p><strong>Institution:</strong> ${
              data.clientDetails.institution || "Not specified"
            }</p>
            <p><strong>Graduation Year:</strong> ${
              data.clientDetails.graduationYear || "Not specified"
            }</p>
            ${
              data.clientDetails.gpa
                ? `<p><strong>GPA:</strong> ${data.clientDetails.gpa}</p>`
                : ""
            }
            
            <h4>📝 Personal Statement Requirements:</h4>
            <p><strong>Career Goals:</strong></p>
            <p style="background: #f8f9fa; padding: 10px; border-radius: 4px; font-style: italic;">
              ${data.clientDetails.careerGoals?.substring(0, 200)}${
      data.clientDetails.careerGoals?.length > 200 ? "..." : ""
    }
            </p>
            
            <p><strong>Why ${data.country}:</strong></p>
            <p style="background: #f8f9fa; padding: 10px; border-radius: 4px; font-style: italic;">
              ${data.clientDetails.whyCountry?.substring(0, 200)}${
      data.clientDetails.whyCountry?.length > 200 ? "..." : ""
    }
            </p>
            
            <p><strong>Academic Background:</strong></p>
            <p style="background: #f8f9fa; padding: 10px; border-radius: 4px; font-style: italic;">
              ${data.clientDetails.academicBackground?.substring(0, 200)}${
      data.clientDetails.academicBackground?.length > 200 ? "..." : ""
    }
            </p>
            
            ${
              data.clientDetails.workExperience
                ? `
              <p><strong>Work Experience:</strong></p>
              <p style="background: #f8f9fa; padding: 10px; border-radius: 4px; font-style: italic;">
                ${data.clientDetails.workExperience.substring(0, 200)}${
                    data.clientDetails.workExperience.length > 200 ? "..." : ""
                  }
              </p>
            `
                : ""
            }
            
            ${
              data.clientDetails.extracurriculars
                ? `
              <p><strong>Extracurricular Activities:</strong></p>
              <p style="background: #f8f9fa; padding: 10px; border-radius: 4px; font-style: italic;">
                ${data.clientDetails.extracurriculars.substring(0, 200)}${
                    data.clientDetails.extracurriculars.length > 200
                      ? "..."
                      : ""
                  }
              </p>
            `
                : ""
            }
            
            <h4>🎯 Additional Requirements:</h4>
            <p><strong>Delivery Format:</strong> ${
              data.clientDetails.deliveryFormat === "both"
                ? "PDF and Word"
                : data.clientDetails.deliveryFormat?.toUpperCase()
            }</p>
            <p><strong>Has Work Experience:</strong> ${
              data.clientDetails.hasWorkExperience ? "Yes" : "No"
            }</p>
            <p><strong>Has Research Experience:</strong> ${
              data.clientDetails.hasResearchExperience ? "Yes" : "No"
            }</p>
            <p><strong>Has Volunteer Experience:</strong> ${
              data.clientDetails.hasVolunteerExperience ? "Yes" : "No"
            }</p>
          </div>

          <div class="card">
            <h3>⏰ Next Steps</h3>
            <ol>
              <li>Review the client details and requirements above</li>
              <li>Contact the client if you need additional information: <a href="mailto:${
                data.clientEmail
              }">${data.clientEmail}</a></li>
              <li>Draft the statement of purpose according to ${
                data.country
              } requirements</li>
              <li>Submit the completed SOP through our portal by the deadline</li>
            </ol>
            
            <p style="margin-top: 20px;">
              <a href="mailto:${
                data.clientEmail
              }" class="cta-button">📧 Contact Client</a>
            </p>
          </div>

          <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
          
          <p>Best regards,<br>
          <strong>Study Abroad Assistant Team</strong></p>
        </div>
        
        <div class="footer">
          <p>This is an automated message. Please do not reply to this email.</p>
          <p>© 2025 Study Abroad Assistant. All rights reserved.</p>
        </div>
      </body>
      </html>
    `,
  };

  return await sendEmail(emailData);
}

// Client confirmation email
export async function sendClientConfirmationEmail(data: {
  to: string;
  clientName: string;
  agentName: string;
  agentSpecialty: string;
  serviceType: string;
  country: string;
  urgency: string;
  requestId: string;
  estimatedDelivery: string;
}): Promise<EmailResult> {
  const urgencyInfo = {
    standard: "7-10 business days",
    priority: "3-5 business days",
    urgent: "24-48 hours",
  };

  const timeline =
    urgencyInfo[data.urgency as keyof typeof urgencyInfo] ||
    urgencyInfo.standard;

  const emailData: EmailData = {
    to: data.to,
    subject: `✅ Your ${
      data.serviceType === "visa" ? "Visa" : "Admission"
    } SOP Request Confirmed - Expert Assigned!`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .card { background: #f0fdf4; border-left: 4px solid #10B981; padding: 15px; margin: 15px 0; }
          .agent-card { background: white; border: 2px solid #10B981; border-radius: 8px; padding: 20px; margin: 15px 0; text-align: center; }
          .timeline { background: #eff6ff; border: 1px solid #3b82f6; border-radius: 8px; padding: 15px; margin: 15px 0; }
          .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }
          .status-badge { 
            display: inline-block; 
            background: #10B981; 
            color: white; 
            padding: 5px 15px; 
            border-radius: 20px; 
            font-size: 12px; 
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎉 Request Confirmed!</h1>
          <p>Your ${
            data.serviceType === "visa" ? "visa" : "admission"
          } SOP is in expert hands</p>
        </div>
        
        <div class="content">
          <p>Dear <strong>${data.clientName}</strong>,</p>
          
          <p>Great news! Your payment has been processed and your ${
            data.serviceType === "visa"
              ? "student visa"
              : "university admission"
          } statement of purpose request has been assigned to one of our specialist agents.</p>

          <div class="card">
            <h3>📋 Your Request Details</h3>
            <p><strong>Request ID:</strong> ${
              data.requestId
            } <span class="status-badge">ASSIGNED</span></p>
            <p><strong>Service:</strong> ${
              data.serviceType === "visa"
                ? "Student Visa SOP"
                : "University Admission SOP"
            }</p>
            <p><strong>Target Country:</strong> ${data.country}</p>
            <p><strong>Expected Delivery:</strong> ${data.estimatedDelivery}</p>
            <p><strong>Timeline:</strong> ${timeline}</p>
          </div>

          <div class="agent-card">
            <h3>👨‍💼 Your Assigned Expert</h3>
            <h2 style="color: #10B981; margin: 10px 0;">${data.agentName}</h2>
            <p style="font-style: italic; color: #666; margin: 5px 0;">${
              data.agentSpecialty
            }</p>
            <p>Your SOP will be crafted by <strong>${
              data.agentName
            }</strong>, who specializes in ${data.country} ${
      data.serviceType
    } applications and has extensive experience helping students achieve their study abroad goals.</p>
          </div>

          <div class="timeline">
            <h3>📅 What Happens Next?</h3>
            <ol>
              <li><strong>Review Phase (Next 24 hours):</strong> Your assigned expert will review your provided information</li>
              <li><strong>Contact (If needed):</strong> The agent may reach out if additional details are required</li>
              <li><strong>Drafting Phase:</strong> Your personalized SOP will be crafted according to ${
                data.country
              } requirements</li>
              <li><strong>Quality Review:</strong> Internal review to ensure excellence</li>
              <li><strong>Delivery:</strong> Your completed SOP will be sent to this email address</li>
            </ol>
          </div>

          <div class="card">
            <h3>💡 Important Notes</h3>
            <ul>
              <li>You may receive an email from your assigned agent if they need additional information</li>
              <li>All communication will come from official Study Abroad Assistant email addresses</li>
              <li>Your SOP will be delivered in your requested format before the deadline</li>
              <li>If you have urgent questions, you can reply to this email</li>
            </ul>
          </div>

          <p>We're excited to help you take this important step toward your study abroad journey. Your expert agent is now working on creating a compelling statement of purpose that will help you stand out in your application.</p>
          
          <p>Best regards,<br>
          <strong>Study Abroad Assistant Team</strong></p>
        </div>
        
        <div class="footer">
          <p>Keep this email for your records. Request ID: ${data.requestId}</p>
          <p>© 2025 Study Abroad Assistant. All rights reserved.</p>
        </div>
      </body>
      </html>
    `,
  };

  return await sendEmail(emailData);
}

// Agent payout notification email
export async function sendAgentPayoutEmail(data: {
  to: string;
  agentName: string;
  payoutAmount: number;
  requestCount: number;
  payoutMethod: string;
  payoutDate: string;
}): Promise<EmailResult> {
  const emailData: EmailData = {
    to: data.to,
    subject: `💰 Commission Payout Processed - $${data.payoutAmount}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .payout-card { background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 2px solid #10B981; border-radius: 12px; padding: 25px; margin: 20px 0; text-align: center; }
          .amount { font-size: 2.5em; font-weight: bold; color: #059669; margin: 10px 0; }
          .details { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 15px 0; }
          .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>💰 Payout Processed!</h1>
          <p>Your commission has been successfully transferred</p>
        </div>
        
        <div class="content">
          <p>Dear <strong>${data.agentName}</strong>,</p>
          
          <p>Congratulations! Your commission payout has been processed successfully.</p>

          <div class="payout-card">
            <h2>Commission Payout</h2>
            <div class="amount">$${data.payoutAmount}</div>
            <p>For ${data.requestCount} completed SOP${
      data.requestCount > 1 ? "s" : ""
    }</p>
          </div>

          <div class="details">
            <h3>📋 Payout Details</h3>
            <p><strong>Amount:</strong> $${data.payoutAmount}</p>
            <p><strong>Completed Requests:</strong> ${data.requestCount}</p>
            <p><strong>Payment Method:</strong> ${data.payoutMethod}</p>
            <p><strong>Processing Date:</strong> ${new Date(
              data.payoutDate
            ).toLocaleDateString()}</p>
            <p><strong>Expected Transfer:</strong> 1-3 business days (depending on your bank)</p>
          </div>

          <div style="background: #eff6ff; border: 1px solid #3b82f6; border-radius: 8px; padding: 15px; margin: 15px 0;">
            <h3>🎯 Keep Up the Great Work!</h3>
            <p>Thank you for your continued excellence in helping students achieve their study abroad dreams. Your expertise and dedication make a real difference in their lives.</p>
            <p>We look forward to assigning you more SOP requests soon!</p>
          </div>

          <p>If you have any questions about this payout or need assistance, please don't hesitate to contact our team.</p>
          
          <p>Best regards,<br>
          <strong>Study Abroad Assistant Team</strong></p>
        </div>
        
        <div class="footer">
          <p>This payout was processed on ${new Date(
            data.payoutDate
          ).toLocaleDateString()}</p>
          <p>© 2025 Study Abroad Assistant. All rights reserved.</p>
        </div>
      </body>
      </html>
    `,
  };

  return await sendEmail(emailData);
}

export async function sendAgentAssignment(
  agentEmail: string,
  agentName: string,
  clientData: any,
  sopContent: string,
  requestId: string
): Promise<EmailResult> {
  const emailData: EmailData = {
    to: agentEmail,
    subject: `🎯 New SOP Assignment - ${clientData.name} (${requestId})`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New SOP Assignment</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; }
          .container { background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .section { margin-bottom: 25px; padding: 20px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #667eea; }
          .highlight { background: #e8f4f8; padding: 15px; border-radius: 8px; margin: 15px 0; }
          .footer { background: #f1f3f4; padding: 20px; text-align: center; font-size: 14px; color: #666; }
          .btn { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
          ul { list-style-type: none; padding-left: 0; }
          li { margin: 8px 0; padding: 8px; background: white; border-radius: 4px; border-left: 3px solid #28a745; }
          .important { color: #dc3545; font-weight: bold; }
          .success { color: #28a745; font-weight: bold; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f8f9fa; font-weight: bold; }
          .sop-content { background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; white-space: pre-wrap; font-size: 14px; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 New SOP Assignment</h1>
            <p>You have been assigned a new SOP writing task</p>
          </div>
          
          <div class="content">
            <div class="highlight">
              <h2>Hello ${agentName}! 👋</h2>
              <p>You have been assigned a new SOP writing task. Please review the client information and AI-generated draft below.</p>
              <p><span class="important">Request ID:</span> ${requestId}</p>
              <p><span class="success">Service Type:</span> ${
                clientData.serviceType === "visa"
                  ? "Immigration SOP"
                  : "Admission SOP"
              }</p>
            </div>

            <div class="section">
              <h3>📋 Client Information</h3>
              <table>
                <tr><th>Name</th><td>${clientData.name}</td></tr>
                <tr><th>Email</th><td>${clientData.email}</td></tr>
                <tr><th>Phone</th><td>${
                  clientData.phone || "Not provided"
                }</td></tr>
                <tr><th>Country</th><td>${clientData.country}</td></tr>
                <tr><th>Study Level</th><td>${clientData.studyLevel}</td></tr>
                <tr><th>Program</th><td>${
                  clientData.program || "Not specified"
                }</td></tr>
                <tr><th>Universities</th><td>${
                  clientData.universities
                    ? clientData.universities.join(", ")
                    : "Not specified"
                }</td></tr>
                <tr><th>Urgency</th><td>${
                  clientData.urgency || "Standard"
                }</td></tr>
                <tr><th>Delivery Format</th><td>${
                  clientData.deliveryFormat || "PDF only"
                }</td></tr>
              </table>
            </div>

            <div class="section">
              <h3>🤖 AI-Generated SOP Draft</h3>
              <p><strong>Please review, enhance, and personalize this draft:</strong></p>
              <div class="sop-content">${sopContent}</div>
            </div>

            <div class="section">
              <h3>📝 Next Steps</h3>
              <ul>
                <li>✅ Review the client information thoroughly</li>
                <li>✅ Enhance the AI-generated SOP with your expertise</li>
                <li>✅ Ensure compliance with immigration/admission requirements</li>
                <li>✅ Personalize the content based on client's background</li>
                <li>✅ Proofread for grammar and clarity</li>
                <li>✅ Submit the final SOP within the required timeframe</li>
              </ul>
            </div>

            <div class="highlight">
              <h3>⏰ Delivery Timeline</h3>
              <p><strong>Expected Delivery:</strong> ${
                clientData.urgency === "urgent"
                  ? "Within 24 hours"
                  : clientData.urgency === "priority"
                  ? "Within 48 hours"
                  : "Within 2-3 business days"
              }</p>
              <p><strong>Commission:</strong> You will earn your standard commission rate upon successful completion.</p>
            </div>

            <div class="section">
              <h3>📞 Need Help?</h3>
              <p>If you have any questions about this assignment or need clarification on client requirements, please contact our support team immediately.</p>
              <p><strong>Support Email:</strong> support@studyabroadassistant.com</p>
            </div>
          </div>
          
          <div class="footer">
            <p>Assignment created on ${new Date().toLocaleDateString()}</p>
            <p>© 2025 Study Abroad Assistant. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  return await sendEmail(emailData);
}
