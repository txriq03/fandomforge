"use client";
import { useMovieDiscovery } from "@/hooks/useMovieDiscovery";
import { getImageUrl } from "@/lib/api/tmdb";
import React from "react";
import MediaPoster from "../MediaPoster";
import { MediaType, TrendingMedia } from "@/types/trending";
import { useParams } from "next/navigation";
import useIsMobile from "@/hooks/useIsMobile";
import { Button } from "@heroui/button";
import Link from "next/link";

const PopularNow = () => {
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
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <h2 className="text-base sm:text-xl text-indigo-100">Popular Now</h2>
        <Button
          variant="light"
          size="sm"
          color="primary"
          className="text-primary-light"
          as={Link}
          href={"/browse/movie/popular"}
        >
          See More
        </Button>
      </div>
      <div className="flex gap-1 sm:gap-2 overflow-x-auto">
        {media?.slice(0, numToShow()).map((media: TrendingMedia) => {
          return <MediaPoster key={media.id} media={media} mediaType={type} />;
        })}
      </div>
    </div>
  );
};

export default PopularNow;
