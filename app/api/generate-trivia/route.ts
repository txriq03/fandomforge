import { NextResponse } from "next/server";
import { generateTrivia } from "@/lib/api/openai";

export async function POST(req: Request) {
  try {
    const { number, title, difficulty } = await req.json();
    const trivia = await generateTrivia(number, title, difficulty);
    return NextResponse.json(trivia);
  } catch (err) {
    console.error("Trivia generation failed:", err);
    return NextResponse.json(
      { error: "Failed to generate trivia" },
      { status: 500 }
    );
  }
}
