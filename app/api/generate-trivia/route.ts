import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { mediaType, number, title, difficulty } = await req.json();

    console.log(
      "Media Type:",
      mediaType,
      "Number:",
      number,
      "Title:",
      title,
      "Difficulty:",
      difficulty,
    );

    const media_type = mediaType === "tv" ? "tv show" : "movie";

    const resp = await openai.responses.create({
      model: "gpt-5-nano",
      prompt: {
        id: "pmpt_689e12e503ec8195a34cce784e88678601336bf859955944",
        variables: {
          media_type,
          number: String(number),
          title,
          difficulty,
        },
      },
      max_output_tokens: 10000,
    });

    return NextResponse.json(JSON.parse(resp.output_text));
  } catch (err) {
    console.error("Error generating trivia:", err);
    return NextResponse.json(
      { error: "Failed to generate trivia" },
      { status: 500 },
    );
  }
}
