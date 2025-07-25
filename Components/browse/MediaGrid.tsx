"use client";
import { useMovieDiscovery } from "@/hooks/useMovieDiscovery";
import { getImageUrl } from "@/lib/api/tmdb";
import React from "react";
import MediaPoster from "../MediaPoster";
import { MediaType, TrendingMedia } from "@/types/trending";
import { useParams } from "next/navigation";
import useIsMobile from "@/hooks/useIsMobile";

const MediaGrid = () => {
  const { data, isPending } = useMovieDiscovery();
  const media: TrendingMedia[] = data?.results;
  const { browseType } = useParams();
  const isMobile = useIsMobile();

  const numToShow = (): number => {
    if (isMobile) {
      return 3;
    } else {
      return 5;
    }
  };

  const type = browseType as MediaType;
  return (
    <div className="flex gap-1 sm:gap-2 overflow-x-auto">
      {media?.slice(0, numToShow()).map((media: TrendingMedia) => {
        const poster = getImageUrl(media.poster_path);
        return <MediaPoster key={media.id} media={media} mediaType={type} />;
      })}
    </div>
  );
};

export default MediaGrid;
