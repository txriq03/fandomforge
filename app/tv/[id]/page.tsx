import MediaBanner from "@/Components/media-page/MediaBanner";
import MediaTabs from "@/Components/media-page/MediaTabs";
import MediaHeader from "@/Components/MediaHeader";
import { getTVById } from "@/lib/api/tmdb";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const TvPage = async ({ params }: PageProps) => {
  const { id } = await params;
  let tvShow = await getTVById(id);

  tvShow = { ...tvShow, media_type: "tv" };

  console.log(tvShow);
  return (
    <>
      <MediaBanner media={tvShow} />
      <MediaHeader media={tvShow} />
      <MediaTabs media={tvShow} />
    </>
  );
};

export default TvPage;
