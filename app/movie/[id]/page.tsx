import MediaBanner from "@/Components/media-page/MediaBanner";
import MediaTabs from "@/Components/media-page/MediaTabs";
import MediaHeader from "@/Components/MediaHeader";
import { getMovieById } from "@/lib/api/tmdb";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const MoviePage = async ({ params }: PageProps) => {
  const { id } = await params;
  let movie = await getMovieById(id);
  movie = { ...movie, media_type: "movie" };

  console.log("Movie media type:", movie.media_type);

  console.log(movie);
  return (
    <>
      <MediaBanner media={movie} />
      <MediaHeader media={movie} />
      <MediaTabs media={movie} />
    </>
  );
};

export default MoviePage;
