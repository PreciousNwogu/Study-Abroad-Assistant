import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error:
          "Missing `OPENAI_API_KEY` environment variable. Set it in your project settings and redeploy.",
      },
      { status: 500 }
    );
  }

  try {
    const { userData } = await req.json();
    const { country, level, course, sopDetails } = userData;

    // Validate that only Canada and UK are supported
    if (country !== "Canada" && country !== "UK") {
      return Response.json(
        {
          error:
            "Currently, we only support SOP generation for Canada and UK applications.",
        },
        { status: 400 }
      );
    }

    const prompt = `Create a compelling Statement of Purpose (SOP) for a student with the following information:

Application Details:
- Country: ${country}
- Level: ${level}
- Course: ${course}

Student Background:
- Career Goal: ${sopDetails?.careerGoal}
- Experience: ${sopDetails?.experience || "Limited professional experience"}
- Academic Background: ${sopDetails?.academicBackground}

Please write a well-structured SOP (400-600 words) that includes:
1. Strong opening paragraph
2. Academic background and achievements
3. Professional/relevant experience
4. Why this specific course and country
5. Career goals and how the program aligns
6. Compelling conclusion

Make it personal, authentic, and persuasive while maintaining professional tone.`;

    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt,
      system:
        "You are an expert SOP writer who creates compelling, personalized statements of purpose for international students. Write in first person and make it authentic and engaging.",
    });

    return Response.json({ sop: text });
  } catch (error) {
    console.error("Error generating SOP:", error);
    return Response.json({ error: "Failed to generate SOP" }, { status: 500 });
  }
}
