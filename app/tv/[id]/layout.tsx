import MediaBanner from "@/Components/media-page/MediaBanner";
import MediaTabs from "@/Components/media-page/MediaTabs";
import MediaHeader from "@/Components/MediaHeader";
import { getTVById } from "@/lib/api/tmdb";
import { ReactNode } from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  children: ReactNode;
}

const TvPage = async ({ params, children }: PageProps) => {
  const { id } = await params;
  let tvShow = await getTVById(id);

  tvShow = { ...tvShow, media_type: "tv" };

  console.log(tvShow);
  return (
    <>
      <MediaBanner media={tvShow} />
      <MediaHeader media={tvShow} />
      <MediaTabs media={tvShow} />
      {children}
    </>
  );
};

export default TvPage;
