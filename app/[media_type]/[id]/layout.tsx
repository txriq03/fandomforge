import { getMediaById } from "@/lib/api/tmdb";
import MediaProvider from "@/providers/MediaProvider";
import { MediaType } from "@/types/trending";
import { ReactNode } from "react";

interface PageProps {
  params: Promise<{
    id: string;
    media_type: MediaType;
  }>;
  children: ReactNode;
}

const Layout = async ({ params, children }: PageProps) => {
  const { id, media_type } = await params;
  let media = await getMediaById(id, media_type);
  media = { ...media, media_type: media_type };

  return <MediaProvider media={media}>{children}</MediaProvider>;
};

export default Layout;
