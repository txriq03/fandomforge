// hooks/useGenerateTrivia.ts
import { useMutation } from "@tanstack/react-query";
import { loadTrivia } from "@/lib/api/openai";

export function useGenerateTrivia() {
  return useMutation({
    mutationKey: ["generate-trivia"],
    mutationFn: loadTrivia, // just reference it here
  });
}
