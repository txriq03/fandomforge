import MCQList from "@/Components/triviaPage/MCQList";
import Container from "@/Components/ui/Container";
import { Difficulty, Payload } from "@/lib/api/openai";
import { MediaType } from "@/types/trending";

const TriviaPage = async ({
  searchParams,
  params,
}: {
  params: Promise<{ media_type: string; id: string }>;
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const { media_type } = await params;
  const resolvedSearchParams = await searchParams;

  // Declare variables
  const mediaType = media_type as MediaType;
  const title = resolvedSearchParams.title;
  const difficulty = resolvedSearchParams.difficulty as Difficulty;
  const questions = Number(resolvedSearchParams.questions);

  const payload: Payload = { mediaType, number: questions, title, difficulty };

  return (
    <Container>
      <MCQList />
    </Container>
  );
};

export default TriviaPage;
