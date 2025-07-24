import puppeteer from "puppeteer";
import { getCountryWithFlag } from "./country-utils";

interface UserData {
  country: string;
  course: string;
  level: string;
  budget: string;
}

export async function generateUniversityListPDF(
  userData: UserData,
  recommendations: string
): Promise<Buffer> {
  let browser;

  try {
    console.log("🚀 Starting PDF generation...");

    // Launch browser with minimal configuration
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--window-size=1920x1080",
      ],
    });

    const page = await browser.newPage();

    // Set viewport for consistent rendering
    await page.setViewport({ width: 1920, height: 1080 });

    console.log("📄 Generating HTML content for PDF...");

    // Create HTML content for the PDF
    const htmlContent = createPDFHtmlContent(userData, recommendations);

    // Set content and wait for it to load
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    console.log("🎨 Converting HTML to PDF...");

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });

    console.log("✅ PDF generated successfully");
    return Buffer.from(pdfBuffer);
  } catch (error) {
    console.error("❌ PDF generation failed:", error);
    throw new Error(
      `PDF generation failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  } finally {
    if (browser) {
      await browser.close();
      console.log("🔒 Browser closed");
    }
  }
}

function createPDFHtmlContent(
  userData: UserData,
  recommendations: string
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>University Recommendations - ${
    userData.course
  } in ${getCountryWithFlag(userData.country)}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      background: white;
      padding: 40px;
    }
    
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding: 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 10px;
    }
    
    .header h1 {
      font-size: 28px;
      margin-bottom: 10px;
    }
    
    .header p {
      font-size: 16px;
      opacity: 0.9;
    }
    
    .user-details {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
      border-left: 4px solid #667eea;
    }
    
    .user-details h2 {
      color: #667eea;
      margin-bottom: 15px;
      font-size: 20px;
    }
    
    .user-details .detail-item {
      margin-bottom: 8px;
      display: flex;
    }
    
    .user-details .detail-label {
      font-weight: bold;
      min-width: 120px;
      color: #555;
    }
    
    .recommendations {
      background: white;
      border: 1px solid #dee2e6;
      padding: 30px;
      border-radius: 8px;
      margin: 20px 0;
      white-space: pre-line;
      font-family: 'Arial', sans-serif;
      line-height: 1.8;
    }
    
    .recommendations h3 {
      color: #667eea;
      margin-bottom: 20px;
      font-size: 22px;
    }
    
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #dee2e6;
      text-align: center;
      color: #666;
    }
    
    .footer .company {
      font-weight: bold;
      color: #667eea;
      font-size: 18px;
    }
    
    .contact-info {
      background: #e8f4fd;
      padding: 20px;
      border-radius: 8px;
      margin-top: 30px;
    }
    
    .contact-info h3 {
      color: #667eea;
      margin-bottom: 15px;
    }
    
    .contact-info ul {
      list-style: none;
    }
    
    .contact-info li {
      margin-bottom: 8px;
      padding-left: 20px;
      position: relative;
    }
    
    .contact-info li:before {
      content: "📧";
      position: absolute;
      left: 0;
    }
    
    .page-break {
      page-break-before: always;
    }
    
    @media print {
      body {
        padding: 20px;
      }
      
      .header {
        -webkit-print-color-adjust: exact;
        color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎓 University Recommendations</h1>
    <p>Personalized Study Abroad Guide</p>
  </div>

  <div class="user-details">
    <h2>📋 Your Study Preferences</h2>
    <div class="detail-item">
      <span class="detail-label">Country:</span>
      <span>${getCountryWithFlag(userData.country)}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Course:</span>
      <span>${userData.course}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Level:</span>
      <span>${userData.level}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Budget:</span>
      <span>${userData.budget}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Generated:</span>
      <span>${new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}</span>
    </div>
  </div>

  <div class="recommendations">
    <h3>🏛️ Recommended Universities</h3>
    ${recommendations}
  </div>

  <div class="contact-info">
    <h3>📞 Next Steps & Support</h3>
    <p><strong>Need assistance with your application?</strong></p>
    <ul>
      <li><strong>Email:</strong> studyabroadasistant@gmail.com</li>
      <li><strong>Website:</strong> www.studyabroadassistant.com</li>
      <li><strong>WhatsApp:</strong> +1 (555) 123-4567</li>
    </ul>
    
    <h4 style="margin-top: 20px; color: #667eea;">📝 Application Checklist:</h4>
    <ul style="margin-top: 10px;">
      <li>✅ Research admission requirements for each university</li>
      <li>✅ Check application deadlines (usually 6-12 months ahead)</li>
      <li>✅ Prepare required documents (transcripts, test scores)</li>
      <li>✅ Write compelling Statement of Purpose</li>
      <li>✅ Apply for scholarships and financial aid</li>
      <li>✅ Contact university admissions offices</li>
    </ul>
  </div>

  <div class="footer">
    <div class="company">Study Abroad Assistant</div>
    <p>🌟 Making your educational dreams come true 🌟</p>
    <p><small>This document was generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</small></p>
  </div>
</body>
</html>
  `;
}

// SOP Feedback PDF Generator
export async function generateSOPFeedbackPDF(
  sopContent: string,
  feedback: string,
  userInfo?: any
): Promise<Buffer> {
  let browser;

  try {
    console.log("🚀 Starting SOP feedback PDF generation...");

    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    const htmlContent = createSOPFeedbackHtmlContent(
      sopContent,
      feedback,
      userInfo
    );
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
    });

    console.log("✅ SOP feedback PDF generated successfully");
    return Buffer.from(pdfBuffer);
  } catch (error) {
    console.error("❌ SOP PDF generation failed:", error);
    throw new Error(
      `SOP PDF generation failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

function createSOPFeedbackHtmlContent(
  sopContent: string,
  feedback: string,
  userInfo?: any
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>SOP Feedback Report</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 40px; }
    .header { text-align: center; margin-bottom: 40px; padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px; }
    .section { margin-bottom: 30px; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; }
    .feedback { background: #f8f9fa; white-space: pre-line; }
    .sop-content { background: #fff; border-left: 4px solid #667eea; }
    h2 { color: #667eea; margin-bottom: 15px; }
    .footer { margin-top: 40px; text-align: center; color: #666; border-top: 2px solid #dee2e6; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>📝 Statement of Purpose Feedback</h1>
    <p>Professional Review & Recommendations</p>
  </div>

  <div class="section sop-content">
    <h2>📄 Your Statement of Purpose</h2>
    <div style="white-space: pre-line;">${sopContent}</div>
  </div>

  <div class="section feedback">
    <h2>💡 Professional Feedback & Recommendations</h2>
    ${feedback}
  </div>

  <div class="footer">
    <p><strong>Study Abroad Assistant</strong></p>
    <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
  </div>
</body>
</html>
  `;
}
