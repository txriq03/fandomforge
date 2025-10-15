import MCQList from "@/Components/triviaPage/MCQList";
import Container from "@/Components/ui/Container";
import { Difficulty, Payload } from "@/lib/api/openai";
import { MediaType } from "@/types/trending";

interface PageProps {
  params: Promise<{
    mediaType: MediaType;
    title: string;
    questions: number;
    difficulty: Difficulty;
  }>;
}

const TriviaPage = async ({ params }: PageProps) => {
  const { mediaType, title, questions, difficulty } = await params;
  const payload: Payload = { mediaType, title, number: questions, difficulty };

  return (
    <Container>
      <MCQList />
    </Container>
  );
};

export default TriviaPage;
