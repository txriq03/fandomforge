"use client";
import { Payload } from "@/lib/api/openai";
import { useTrivia } from "@/providers/TriviaProvider";
import { useEffect } from "react";

const MCQList = ({ payload }: { payload: Payload }) => {
  // Get cached trivia questions
  const { generate } = useTrivia();

  useEffect(() => {
    const fetchTrivia = async () => {
      const res = await generate(payload);
      console.log(res);
    };

    fetchTrivia();
  }, [generate, payload]);

  return <div>Hello</div>;
};

export default MCQList;
