import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email-service";
import { generatePremiumSOPPDF } from "@/lib/premium-sop-pdf";

interface PremiumSOPData {
  sop: string;
  feedback: string;
  applicantName: string;
  targetProgram: string;
  targetUniversity: string;
  wordCount: number;
}

export async function POST(request: NextRequest) {
  try {
    const { email, sopData, userData } = await request.json();

    if (!email || !sopData) {
      return NextResponse.json(
        { success: false, error: "Email and SOP data are required" },
        { status: 400 }
      );
    }

    // Generate PDF for the premium SOP
    const pdfBuffer = await generatePremiumSOPPDF(sopData);

    // Create email content
    const subject = `✨ Your Professional Statement of Purpose - ${sopData.applicantName}`;

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #4F46E5, #7C3AED); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { padding: 30px; background: #fff; }
        .highlight { background: #F3F4F6; padding: 20px; border-left: 4px solid #4F46E5; margin: 20px 0; border-radius: 0 8px 8px 0; }
        .footer { background: #F9FAFB; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; }
        .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        ul { padding-left: 20px; }
        li { margin: 5px 0; }
        .contact-box { background: #EEF2FF; padding: 15px; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>✨ Your Professional SOP is Ready!</h1>
        <p>Expert-crafted by our education consultants</p>
      </div>
      
      <div class="content">
        <p>Dear ${sopData.applicantName},</p>
        
        <p>Congratulations! Your professional Statement of Purpose has been completed by our expert education consultants and is ready for your application to <strong>${sopData.targetProgram}</strong> at <strong>${sopData.targetUniversity}</strong>.</p>
        
        <div class="highlight">
          <h3>📦 Your Professional Package Includes:</h3>
          <ul>
            <li><strong>Expert-Crafted SOP (PDF)</strong> - Human-reviewed and professionally written</li>
            <li><strong>Strategic Consultation Report</strong> - Detailed guidance from our specialists</li>
            <li><strong>University-Specific Insights</strong> - Research-backed recommendations</li>
            <li><strong>Revision Guidelines</strong> - ${sopData.wordCount} words optimized for impact</li>
          </ul>
        </div>
        
        <h3>🎯 What Makes Your SOP Exceptional:</h3>
        <ul>
          <li>✅ <strong>Human expertise</strong> from senior education consultants</li>
          <li>✅ <strong>Deep research</strong> into your target program and university</li>
          <li>✅ <strong>Strategic positioning</strong> to maximize admission chances</li>
          <li>✅ <strong>Authentic storytelling</strong> that showcases your unique journey</li>
          <li>✅ <strong>Professional quality</strong> ready for immediate submission</li>
        </ul>
        
        <div class="highlight">
          <h3>📝 Your Next Steps:</h3>
          <ol>
            <li>Review the attached PDF document carefully</li>
            <li>Read through our strategic consultation report</li>
            <li>Apply any suggested personalizations if needed</li>
            <li>Submit with confidence to your target university</li>
            <li>Contact us for interview preparation support</li>
          </ol>
        </div>
        
        <h3>💡 Professional Tips:</h3>
        <ul>
          <li>Save multiple copies of your SOP as backup</li>
          <li>Use our consultation insights for other applications</li>
          <li>The core narrative can be adapted for similar programs</li>
          <li>Maintain professional formatting when copying text</li>
        </ul>

        <div class="contact-box">
          <h3 style="margin-top: 0; color: #4F46E5;">📞 Contact Our Expert Team</h3>
          <p style="margin-bottom: 0;"><strong>Questions? Need support? We're here to help!</strong></p>
          <ul style="margin: 10px 0;">
            <li>📧 <strong>Email:</strong> <a href="mailto:studyabroadasistant@gmail.com">studyabroadasistant@gmail.com</a></li>
            <li>💬 <strong>WhatsApp:</strong> +1 (555) 123-4567</li>
            <li>🌐 <strong>Website:</strong> <a href="https://www.studysmartai.com">www.studysmartai.com</a></li>
          </ul>
          <p style="font-size: 12px; color: #6B7280; margin-bottom: 0;">
            Available for interview prep, application strategy, and ongoing support
          </p>
        </div>
      </div>
      
      <div class="footer">
        <p><strong>Study Abroad Assistant</strong> | Professional SOP Service</p>
        <p>Expert education consultants helping students achieve their academic dreams 🌍</p>
        <p style="font-size: 12px; color: #6B7280;">
          Human-reviewed • University-specific • Strategic positioning
        </p>
      </div>
    </body>
    </html>
    `;

    const textContent = `
✨ Premium SOP Package Ready!

Dear ${sopData.applicantName},

Congratulations! Your premium Statement of Purpose has been professionally crafted and is ready for your application to ${sopData.targetProgram} at ${sopData.targetUniversity}.

📦 Your Premium Package Includes:
• Professional SOP Document (PDF) - Ready for submission
• Expert Review & Feedback - Detailed analysis and recommendations  
• Word Count Analysis - ${sopData.wordCount} words (optimized length)
• Customization Guide - Tips for further personalization

🎯 What Makes Your SOP Special:
✅ Authentic storytelling that showcases your unique journey
✅ Deep research into your target program and university
✅ Strategic positioning to highlight your strongest qualities
✅ Professional writing that engages admissions committees
✅ Expert feedback for continuous improvement

📝 Next Steps:
1. Review the attached PDF document
2. Read through the expert feedback carefully
3. Make any final personalizations if needed
4. Submit with confidence to your target university

💡 Pro Tips:
• Save the PDF in multiple locations as backup
• Consider the feedback suggestions for other applications
• Feel free to adapt the core narrative for similar programs
• Keep the document formatting when copying text

Need additional support? Our team is here to help:
📧 Email: studyabroadasistant@gmail.com
💬 WhatsApp: +1 (555) 123-4567
🌐 Website: www.studysmartai.com

Best regards,
Study Abroad Assistant | Premium SOP Service
Helping students achieve their academic dreams worldwide 🌍
    `;

    // Send email with PDF attachment
    const emailResult = await sendEmail({
      to: email,
      subject: subject,
      html: htmlContent,
      attachments: [
        {
          filename: `Premium_SOP_${sopData.applicantName.replace(
            /\s+/g,
            "_"
          )}_${sopData.targetUniversity.replace(/\s+/g, "_")}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    if (emailResult.success) {
      return NextResponse.json({
        success: true,
        message: "Premium SOP package sent successfully!",
        emailId: emailResult.messageId,
      });
    } else {
      console.error("Failed to send premium SOP email:", emailResult.message);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send email",
          details: emailResult.message,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error sending premium SOP:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
