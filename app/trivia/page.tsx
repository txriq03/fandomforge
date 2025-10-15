import MCQList from "@/Components/triviaPage/MCQList";
import Container from "@/Components/ui/Container";
import { Difficulty, Payload } from "@/lib/api/openai";

interface PageProps {
  params: Promise<{
    title: string;
    questions: number;
    difficulty: Difficulty;
  }>;
}

const TriviaPage = async ({ params }: PageProps) => {
  const { title, questions, difficulty } = await params;
  const payload: Payload = { title, number: questions, difficulty };

  return (
    <Container>
      <MCQList />
    </Container>
  );
};

export default TriviaPage;
