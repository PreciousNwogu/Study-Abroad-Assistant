import {
  generateUniversityListPDF,
  generateSOPFeedbackPDF,
} from "@/lib/pdf-generator";

export async function POST(req: Request) {
  try {
    const { type = "university", testData } = await req.json();

    console.log("🧪 Testing PDF generation for type:", type);

    if (type === "university") {
      const mockUserData = testData || {
        country: "Canada",
        course: "Computer Science",
        level: "Masters",
        budget: "Moderate ($20,000-$40,000)",
      };

      const mockRecommendations = `
1. University of Toronto - Toronto, Ontario
   • Estimated tuition: $58,160 CAD per year
   • World-renowned computer science program with strong AI/ML focus
   • Excellent research opportunities and industry connections
   • Website: https://www.utoronto.ca
   • Contact: admissions@utoronto.ca

2. University of British Columbia - Vancouver, BC
   • Estimated tuition: $51,320 CAD per year
   • Beautiful campus with strong tech industry ties
   • Excellent co-op programs and internship opportunities
   • Website: https://www.ubc.ca
   • Contact: admissions@ubc.ca

3. McGill University - Montreal, Quebec
   • Estimated tuition: $43,470 CAD per year
   • Prestigious institution with excellent computer science faculty
   • Vibrant student life and multicultural environment
   • Website: https://www.mcgill.ca
   • Contact: admissions@mcgill.ca
      `;

      console.log("📄 Generating university list PDF...");
      const pdfBuffer = await generateUniversityListPDF(
        mockUserData,
        mockRecommendations
      );

      return new Response(pdfBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition":
            'attachment; filename="test-university-list.pdf"',
        },
      });
    } else if (type === "sop") {
      const mockSOPContent = `
Dear Admissions Committee,

I am writing to express my strong interest in pursuing a Master's degree in Computer Science at your esteemed institution. With a Bachelor's degree in Computer Engineering and two years of professional experience in software development, I am eager to advance my knowledge and skills in artificial intelligence and machine learning.

During my undergraduate studies, I developed a passion for algorithms and data structures, which led me to work on several projects involving natural language processing and computer vision. My final year project on sentiment analysis using deep learning techniques received recognition from the faculty and was presented at the university's research symposium.

In my professional career at TechCorp, I have worked as a software engineer developing web applications using modern frameworks like React and Node.js. This experience has given me practical insights into software architecture and the importance of scalable, maintainable code. However, I realize that to make significant contributions to the field of AI, I need to deepen my theoretical understanding and gain exposure to cutting-edge research.

Your university's computer science program particularly appeals to me because of its strong research focus in machine learning and the opportunity to work with renowned faculty members like Dr. Smith and Dr. Johnson. I am especially interested in their work on reinforcement learning and its applications in robotics.

I am confident that my background, combined with my passion for learning and research, makes me a strong candidate for your program. I look forward to contributing to your research community and advancing the field of artificial intelligence.

Thank you for considering my application.

Sincerely,
John Doe
      `;

      const mockFeedback = `
## Overall Assessment: Strong foundation with room for improvement

**Strengths:**
- Clear academic and professional background
- Specific interest areas (AI/ML)
- Relevant project experience mentioned
- Good structure and flow

**Areas for Improvement:**

1. **More Specific Goals**: While you mention AI and ML, be more specific about your research interests and career goals.

2. **Stronger Connection to University**: Research more about specific programs, courses, or research groups that align with your interests.

3. **Quantifiable Achievements**: Include specific metrics about your projects and professional accomplishments.

4. **Personal Story**: Add more about what drives your passion for computer science.

**Recommendations:**
- Research and mention specific courses or research labs at the university
- Include more details about your technical projects with results/impact
- Explain how this degree fits into your long-term career plans
- Consider adding information about leadership or teamwork experiences

**Score: 7.5/10** - Good foundation that can be strengthened with more specificity and personal insights.
      `;

      console.log("📝 Generating SOP feedback PDF...");
      const pdfBuffer = await generateSOPFeedbackPDF(
        mockSOPContent,
        mockFeedback,
        { course: "Computer Science" }
      );

      return new Response(pdfBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="test-sop-feedback.pdf"',
        },
      });
    }

    return Response.json(
      {
        success: false,
        message: "Invalid type. Use 'university' or 'sop'",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("❌ PDF test failed:", error);
    return Response.json(
      {
        success: false,
        message: `PDF generation failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        error: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
