export type Difficulty = "easy" | "medium" | "hard";
export type Payload = { number: number; title: string; difficulty: Difficulty };

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
