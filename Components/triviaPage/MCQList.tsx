"use client";
import { Difficulty, Payload } from "@/lib/api/openai";
import { useTrivia } from "@/providers/TriviaProvider";
import { MediaType } from "@/types/trending";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const MCQList = () => {
  // Get cached trivia questions
  const { generate } = useTrivia();
  const searchParams = useSearchParams();
  const params = useParams();

  // Set variables
  const mediaType = params.media_type as MediaType;
  const title = searchParams.get("title") as string;
  const questions = Number(searchParams.get("questions"));
  const difficulty: Difficulty = searchParams.get("difficulty") as Difficulty;

  const payload: Payload = { title, number: questions, difficulty, mediaType };

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
