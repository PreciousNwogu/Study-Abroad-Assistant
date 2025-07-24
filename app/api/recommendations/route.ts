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
    const { country, level, course, budget } = await req.json();

    // Validate that only Canada and UK are supported
    if (country !== "Canada" && country !== "UK") {
      return Response.json(
        {
          error:
            "Currently, we only support university recommendations for Canada and UK.",
        },
        { status: 400 }
      );
    }

    const prompt = `You are a study abroad consultant specializing in ${country}. Based on the following student information, recommend 3-5 universities ONLY in ${country} with specific details:

Student Info:
- Country: ${country}
- Level: ${level}
- Course: ${course}
- Budget: ${budget}

IMPORTANT: Only recommend universities located in ${country}. Do not suggest universities from other countries.

Please provide for each university:
1. University name and specific location within ${country}
2. Approximate tuition fees per year in local currency
3. Brief description of why it's a good fit for ${course}
4. Any special programs or advantages specific to ${course}
5. Application requirements and deadlines if known

Format the response in a friendly, conversational way with emojis and clear structure. Make sure all recommendations are specifically in ${country}.`;

    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt,
      system: `You are a helpful study abroad consultant who provides accurate, up-to-date information about universities worldwide. When a specific country is mentioned, only recommend universities from that country. Be encouraging and informative, and focus on the requested destination.`,
    });

    return Response.json({ recommendations: text });
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return Response.json(
      { error: "Failed to generate recommendations" },
      { status: 500 }
    );
  }
}
