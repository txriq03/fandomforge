"use client";
import { getImageUrl } from "@/lib/api/tmdb";
import { cn } from "@/lib/utils";
import { useMedia } from "@/providers/MediaProvider";
import { Movie } from "@/types/movie";
import TVSeries from "@/types/tv";
import Image from "next/image";

const MediaBanner = () => {
  const media: Movie | TVSeries = useMedia();
  const backdropUrl = getImageUrl(media.backdrop_path);
  const title = "title" in media ? media.title : media.name;
  return (
    <div
      className={cn(
        `w-full h-[280px] sm:h-[300px] bg-slate-800 bg-cover bg-center relative`
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b z-1  from-black/80 via-transparent to-background sm:to-transparent" />

      <Image
        alt={title}
        fill
        src={backdropUrl}
        className="object-cover object-center"
        priority
      />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
    </div>
  );
};

export default MediaBanner;
