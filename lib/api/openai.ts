import OpenAI from "openai";
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Difficulty = "easy" | "medium" | "hard";
type Payload = { number: number; title: string; difficulty: Difficulty };

export type TriviaResponse = {
  questions: Array<{
    id?: string;
    question: string;
    choices: [string, string, string, string];
    correct_index: 0 | 1 | 2 | 3;
    correct_answer: string;
    explanation?: string;
    difficulty?: Difficulty;
  }>;
};

export const loadTrivia = async (payload: Payload) => {
  const res = await fetch("/api/generate-trivia", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const trivia = await res.json();
  return trivia;
};

export const generateTrivia = async (
  number: number,
  title: string,
  difficulty: Difficulty
): Promise<TriviaResponse> => {
  const resp = await openai.responses.create({
    model: "gpt-5-nano",
    prompt: {
      id: "pmpt_689e12e503ec8195a34cce784e88678601336bf859955944",
      variables: {
        number: String(number),
        title,
        difficulty,
      },
    },
  });

  return JSON.parse(resp.output_text);
};
