import MediaHeader from "@/Components/MediaHeader";
import { getTVById } from "@/lib/api/tmdb";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const TvPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const tvShow = await getTVById(id);
  console.log(tvShow);
  return (
    <>
      <MediaHeader media={tvShow} />
    </>
  );
};

export default TvPage;
