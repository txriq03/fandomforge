import MediaHeader from "@/Components/MediaHeader";
import { getMovieById } from "@/lib/api/tmdb";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const MoviePage = async ({ params }: PageProps) => {
  const { id } = await params;
  const movie = await getMovieById(id);
  console.log(movie);
  return (
    <>
      <MediaHeader media={movie} />
    </>
  );
};

export default MoviePage;
