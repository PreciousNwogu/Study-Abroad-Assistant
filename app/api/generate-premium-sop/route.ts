import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface SOPFormData {
  fullName: string;
  currentEducation: string;
  gpa: string;
  universityName: string;
  graduationYear: string;
  targetProgram: string;
  targetUniversity: string;
  targetCountry: string;
  applicationDeadline: string;
  careerGoal: string;
  shortTermGoals: string;
  longTermVision: string;
  whyThisProgram: string;
  whyThisUniversity: string;
  workExperience: string;
  researchExperience: string;
  projects: string;
  achievements: string;
  extracurriculars: string;
  technicalSkills: string;
  languageSkills: string;
  personalInterests: string;
  inspirationStory: string;
  challenges: string;
  uniqueValue: string;
  fundingPlan: string;
  postGradPlans: string;
}

export async function POST(request: NextRequest) {
  try {
    const sopData: SOPFormData = await request.json();

    // Create a comprehensive prompt for premium SOP generation
    const prompt = `
You are a senior admissions consultant and professional academic writer with 20+ years of experience helping students gain admission to top universities worldwide. You have personally reviewed thousands of successful applications to Ivy League, Russell Group, and other prestigious institutions.

Your task is to create an exceptional, human-crafted Statement of Purpose that reads as if it was personally written and reviewed by our expert team of education consultants.

Create a professional, authentic, and compelling Statement of Purpose based on the following detailed client information:

PERSONAL & ACADEMIC BACKGROUND:
- Name: ${sopData.fullName}
- Current Education: ${sopData.currentEducation}
- GPA: ${sopData.gpa || "Not provided"}
- Current University: ${sopData.universityName}
- Graduation Year: ${sopData.graduationYear || "Not specified"}

TARGET PROGRAM DETAILS:
- Program: ${sopData.targetProgram}
- University: ${sopData.targetUniversity}
- Country: ${sopData.targetCountry}
- Application Deadline: ${sopData.applicationDeadline || "Not specified"}

CAREER VISION & GOALS:
- Primary Career Goal: ${sopData.careerGoal}
- Short-term Goals: ${sopData.shortTermGoals || "Not specified"}
- Long-term Vision: ${sopData.longTermVision || "Not specified"}
- Why This Program: ${sopData.whyThisProgram}
- Why This University: ${sopData.whyThisUniversity || "Not specified"}

EXPERIENCE & ACHIEVEMENTS:
- Work Experience: ${sopData.workExperience || "Not specified"}
- Research Experience: ${sopData.researchExperience || "Not specified"}
- Key Projects: ${sopData.projects || "Not specified"}
- Awards & Achievements: ${sopData.achievements || "Not specified"}
- Leadership & Extracurriculars: ${sopData.extracurriculars || "Not specified"}
- Technical Skills: ${sopData.technicalSkills || "Not specified"}
- Language Skills: ${sopData.languageSkills || "Not specified"}

PERSONAL STORY & MOTIVATION:
- Inspiration Story: ${sopData.inspirationStory}
- Challenges Overcome: ${sopData.challenges || "Not specified"}
- What Makes Them Unique: ${sopData.uniqueValue}
- Personal Interests: ${sopData.personalInterests || "Not specified"}

FUTURE PLANS:
- Post-Graduation Plans: ${sopData.postGradPlans}
- Funding Plan: ${sopData.fundingPlan || "Not specified"}

INSTRUCTIONS FOR PROFESSIONAL SOP CREATION:

Our expert writing team has carefully analyzed your background and target program to craft this personalized Statement of Purpose. This document has been:

✅ **Human-reviewed** by senior education consultants
✅ **Customized** based on deep program research  
✅ **Strategically positioned** to highlight your strongest qualities
✅ **Professionally edited** for maximum impact

1. NARRATIVE STRUCTURE:
   - Compelling opening that immediately establishes your unique perspective
   - Clear progression showing growth and development
   - Strategic positioning of experiences to build credibility
   - Powerful conclusion that reinforces your value to the program

2. CONTENT DEPTH:
   - 800-1000 words optimized for readability and impact
   - Program-specific insights demonstrating thorough research
   - Authentic storytelling that showcases genuine motivation
   - Professional tone that engages admissions committees

3. STRATEGIC POSITIONING:
   - Highlight unique qualities that differentiate you from other applicants
   - Connect past experiences directly to future goals
   - Demonstrate cultural fit and potential contributions
   - Show clear understanding of program requirements and opportunities

4. PROFESSIONAL STANDARDS:
   - University-specific customization with faculty and course references
   - Industry-standard formatting and structure
   - Evidence-based achievements with quantifiable results
   - Compelling narrative arc that maintains reader engagement

This SOP has been professionally crafted to maximize your admission chances while maintaining complete authenticity to your personal story and goals.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a senior admissions consultant and professional academic writer who personally reviews and crafts exceptional Statements of Purpose. Your writing style is sophisticated, authentic, and strategically positioned to maximize admission success. You never mention AI or automated processes - everything is presented as human-crafted professional work.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 2500,
      temperature: 0.7,
    });

    const sop = completion.choices[0]?.message?.content;

    if (!sop) {
      throw new Error("Failed to generate SOP");
    }

    // Generate additional feedback and recommendations
    // Generate professional consultation feedback
    const feedbackPrompt = `
As a senior education consultant who just completed the professional review of ${sopData.fullName}'s Statement of Purpose for ${sopData.targetProgram} at ${sopData.targetUniversity}, provide comprehensive guidance and strategic recommendations:

**PROFESSIONAL CONSULTATION REPORT**

1. **STRATEGIC STRENGTHS ANALYSIS:**
   - Which elements of this SOP position the candidate most competitively?
   - How effectively does it differentiate them from other applicants?
   - What unique value propositions emerge from their background?

2. **ENHANCEMENT OPPORTUNITIES:**
   - Areas where additional research or detail could strengthen the application
   - Specific program elements they should further explore and reference
   - Ways to better connect their experiences to program outcomes

3. **PROGRAM-SPECIFIC STRATEGIC ADVICE:**
   - Key faculty members whose research aligns with their interests
   - Specific courses, labs, or opportunities they should mention
   - University culture and values they should emphasize

4. **COMPETITIVE POSITIONING:**
   - How this SOP compares to successful applications we've seen
   - Additional application components that would complement this narrative
   - Interview preparation based on themes established in the SOP

5. **FINAL RECOMMENDATIONS:**
   - Any adjustments for different programs or universities
   - Timeline and next steps for application success
   - Additional support resources for their academic journey

Provide this as professional consultation that demonstrates deep expertise in academic admissions and genuine investment in the student's success. Focus on actionable, specific guidance that adds real value beyond the SOP itself.
`;

    const feedbackCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a senior education consultant providing professional consultation and strategic guidance. Your feedback demonstrates deep expertise in admissions processes and shows genuine investment in student success. Never mention AI or automated processes.",
        },
        {
          role: "user",
          content: feedbackPrompt,
        },
      ],
      max_tokens: 1500,
      temperature: 0.6,
    });

    const feedback = feedbackCompletion.choices[0]?.message?.content;

    return NextResponse.json({
      success: true,
      sop: sop,
      feedback: feedback,
      applicantName: sopData.fullName,
      targetProgram: sopData.targetProgram,
      targetUniversity: sopData.targetUniversity,
      wordCount: sop.split(" ").length,
    });
  } catch (error) {
    console.error("Error generating premium SOP:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate SOP. Please try again.",
      },
      { status: 500 }
    );
  }
}
