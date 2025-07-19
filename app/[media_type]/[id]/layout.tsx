import MediaBanner from "@/Components/media-page/MediaBanner";
import MediaTabs from "@/Components/media-page/MediaTabs";
import MediaHeader from "@/Components/MediaHeader";
import { getMediaById } from "@/lib/api/tmdb";
import { MediaType } from "@/types/trending";
import { ReactNode } from "react";

interface PageProps {
  params: Promise<{
    id: string;
    media_type: MediaType;
  }>;
  children: ReactNode;
}

const MovieLayout = async ({ params, children }: PageProps) => {
  const { id, media_type } = await params;
  let media = await getMediaById(id, media_type);
  media = { ...media, media_type: media_type };

  console.log(media);
  return (
    <>
      <MediaBanner media={media} />
      <MediaHeader media={media} />
      <MediaTabs media={media} />
      {children}
    </>
  );
};

export default MovieLayout;
