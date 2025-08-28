import { useQuery } from "@tanstack/react-query";
import { generateTrivia } from "@/lib/api/openai";
import { Payload } from "@/lib/api/openai";

export const triviaKey = (p: Payload) =>
  ["generate-trivia", JSON.stringify(p)] as const;

export function useGenerateTrivia(payload: Payload) {
  return useQuery({
    queryKey: triviaKey(payload),
    queryFn: () => generateTrivia(payload),
    enabled: false,
    staleTime: 1000 * 60 * 60,
  });
}
