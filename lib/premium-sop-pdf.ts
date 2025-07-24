import puppeteer from "puppeteer";

interface PremiumSOPData {
  sop: string;
  feedback: string;
  applicantName: string;
  targetProgram: string;
  targetUniversity: string;
  wordCount: number;
}

export async function generatePremiumSOPPDF(
  sopData: PremiumSOPData
): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Premium Statement of Purpose - ${sopData.applicantName}</title>
      <style>
        body {
          font-family: 'Times New Roman', serif;
          line-height: 1.6;
          margin: 0;
          padding: 40px;
          color: #333;
          background: white;
        }
        
        .header {
          text-align: center;
          margin-bottom: 40px;
          border-bottom: 3px solid #4F46E5;
          padding-bottom: 20px;
        }
        
        .header h1 {
          font-size: 28px;
          color: #4F46E5;
          margin: 0 0 10px 0;
          font-weight: bold;
        }
        
        .header .subtitle {
          font-size: 16px;
          color: #6B7280;
          margin: 5px 0;
        }
        
        .meta-info {
          background: #F8FAFC;
          border-left: 4px solid #4F46E5;
          padding: 20px;
          margin: 30px 0;
          border-radius: 0 8px 8px 0;
        }
        
        .meta-info h3 {
          margin: 0 0 15px 0;
          color: #4F46E5;
          font-size: 18px;
        }
        
        .meta-info .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        
        .meta-info .info-item {
          display: flex;
          align-items: center;
        }
        
        .meta-info .label {
          font-weight: bold;
          color: #374151;
          margin-right: 8px;
          min-width: 100px;
        }
        
        .meta-info .value {
          color: #6B7280;
        }
        
        .sop-content {
          margin: 40px 0;
          line-height: 1.8;
        }
        
        .sop-content h2 {
          color: #4F46E5;
          font-size: 24px;
          margin: 40px 0 20px 0;
          border-bottom: 2px solid #E5E7EB;
          padding-bottom: 10px;
        }
        
        .sop-content p {
          margin: 20px 0;
          text-align: justify;
          font-size: 12px;
          text-indent: 30px;
        }
        
        .sop-content p:first-of-type {
          text-indent: 0;
          font-weight: 500;
        }
        
        .feedback-section {
          margin-top: 50px;
          padding: 30px;
          background: linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%);
          border-radius: 12px;
          border: 1px solid #D1D5DB;
        }
        
        .feedback-section h2 {
          color: #059669;
          font-size: 22px;
          margin: 0 0 25px 0;
          display: flex;
          align-items: center;
        }
        
        .feedback-section h2:before {
          content: "💡";
          margin-right: 10px;
          font-size: 24px;
        }
        
        .feedback-content {
          font-size: 11px;
          line-height: 1.7;
          color: #374151;
        }
        
        .feedback-content h3 {
          color: #059669;
          font-size: 14px;
          margin: 25px 0 10px 0;
          font-weight: bold;
        }
        
        .feedback-content h4 {
          color: #4B5563;
          font-size: 12px;
          margin: 20px 0 8px 0;
          font-weight: 600;
        }
        
        .feedback-content ul {
          margin: 10px 0 20px 20px;
          padding: 0;
        }
        
        .feedback-content li {
          margin: 5px 0;
          list-style-type: disc;
        }
        
        .footer {
          margin-top: 50px;
          padding-top: 20px;
          border-top: 2px solid #E5E7EB;
          text-align: center;
          font-size: 10px;
          color: #6B7280;
        }
        
        .premium-badge {
          display: inline-block;
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        
        .word-count {
          text-align: right;
          font-size: 10px;
          color: #6B7280;
          margin-top: 20px;
          font-style: italic;
        }
        
        @media print {
          body { 
            padding: 20px; 
          }
          .feedback-section {
            page-break-before: always;
          }
        }
        
        /* Better typography */
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Georgia', serif;
        }
        
        .sop-content {
          font-family: 'Times New Roman', serif;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="premium-badge">✨ Professional SOP Service</div>
        <h1>Statement of Purpose</h1>
        <div class="subtitle">${sopData.applicantName}</div>
        <div class="subtitle">${sopData.targetProgram}</div>
        <div class="subtitle">${sopData.targetUniversity}</div>
      </div>

      <div class="meta-info">
        <h3>📋 Professional Review Details</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Client:</span>
            <span class="value">${sopData.applicantName}</span>
          </div>
          <div class="info-item">
            <span class="label">Target Program:</span>
            <span class="value">${sopData.targetProgram}</span>
          </div>
          <div class="info-item">
            <span class="label">University:</span>
            <span class="value">${sopData.targetUniversity}</span>
          </div>
          <div class="info-item">
            <span class="label">Document Length:</span>
            <span class="value">${sopData.wordCount} words</span>
          </div>
        </div>
      </div>

      <div class="sop-content">
        <h2>📝 Professional Statement of Purpose</h2>
        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #4F46E5;">
          <p style="margin: 0; font-size: 11px; color: #4F46E5; font-weight: 600;">
            ✅ Human-reviewed by senior education consultants<br/>
            ✅ Strategically crafted for maximum admission impact<br/>
            ✅ University-specific research and customization<br/>
            ✅ Professional editing and quality assurance
          </p>
        </div>
        ${sopData.sop
          .split("\n")
          .map((paragraph) =>
            paragraph.trim() ? `<p>${paragraph.trim()}</p>` : ""
          )
          .join("")}
        
        <div class="word-count">
          Word Count: ${sopData.wordCount} words
        </div>
      </div>

      <div class="feedback-section">
        <h2>Strategic Consultation & Expert Recommendations</h2>
        <div class="feedback-content">
          <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #059669;">
            <p style="margin: 0; font-size: 11px; color: #059669; font-weight: 600;">
              📋 Professional consultation by senior education specialists<br/>
              🎯 Strategic guidance for competitive positioning<br/>
              📚 University-specific insights and recommendations<br/>
              ⚡ Actionable next steps for application success
            </p>
          </div>
          ${sopData.feedback
            .split("\n")
            .map((line) => {
              const trimmed = line.trim();
              if (!trimmed) return "";

              // Convert markdown-style headers
              if (trimmed.match(/^\d+\.\s+[A-Z\s]+:$/)) {
                return `<h3>${trimmed}</h3>`;
              }
              if (trimmed.startsWith("- ")) {
                return `<h4>${trimmed.substring(2)}</h4>`;
              }
              if (trimmed.startsWith("  - ")) {
                return `<li>${trimmed.substring(4)}</li>`;
              }

              return `<p>${trimmed}</p>`;
            })
            .join("")}
        </div>
      </div>

      <div class="footer">
        <p><strong>Study Abroad Assistant</strong> | Professional SOP Service</p>
        <p>Human-reviewed • Expert-crafted • University-specific</p>
        <p style="margin-top: 10px; font-size: 10px;">
          <strong>📧 Contact Our Team:</strong><br/>
          Email: studyabroadasistant@gmail.com | WhatsApp: +1 (555) 123-4567<br/>
          Website: www.studysmartai.com
        </p>
        <p style="font-size: 10px; color: #6B7280; margin-top: 10px;">
          Document completed on ${new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })} | This document contains confidential client information.
        </p>
      </div>
    </body>
    </html>
    `;

    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
      format: "A4",
      margin: {
        top: "20mm",
        right: "20mm",
        bottom: "20mm",
        left: "20mm",
      },
      printBackground: true,
      preferCSSPageSize: true,
    });

    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
