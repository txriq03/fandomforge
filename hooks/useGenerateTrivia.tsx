import { useQuery } from "@tanstack/react-query";
import { generateTrivia } from "@/lib/api/openai";
import { Payload } from "@/lib/api/openai";

export function useGenerateTrivia(payload: Payload) {
  return useQuery({
    queryKey: ["generate-trivia", payload],
    queryFn: () => generateTrivia(payload),
    enabled: false,
    staleTime: 1000 * 60 * 60,
  });
}
