"use client";
import { useMediaDiscovery } from "@/hooks/useMediaDiscovery";
import React from "react";
import MediaPoster from "../MediaPoster";
import { MediaType, TrendingMovie, TrendingTV } from "@/types/trending";
import { useParams } from "next/navigation";
import useIsMobile from "@/hooks/useIsMobile";
import { Button } from "@heroui/button";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";
import { useTrending } from "@/hooks/useTrending";
import SkeletonGroup from "./SkeletonGroup";
import { cn } from "@/lib/utils";

const TrendingNow = () => {
  const { browseType } = useParams();
  const type = browseType as MediaType;
  console.log("Type:", type);
  const { data, isPending } = useTrending(type);
  type TrendingMedia = TrendingMovie | TrendingTV;
  const media: TrendingMedia[] = data;
  const isMobile = useIsMobile();

  const isTablet = useMediaQuery("(max-width: 1024px");

  const numToShow = (): number => {
    if (isMobile) {
      return 3;
    } else if (isTablet) {
      return 4;
    } else {
      return 5;
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <h2 className="text-base sm:text-xl text-indigo-100">Trending Now</h2>
        <Button
          variant="light"
          size="sm"
          color="primary"
          className="text-primary-light"
          as={Link}
          href={"/browse/movie/trending"}
        >
          See More
        </Button>
      </div>

      {isPending && (
        <div className={cn("flex gap-1 sm:gap-2 lg:gap-2")}>
          <SkeletonGroup />
          <SkeletonGroup />
          <SkeletonGroup />
          <SkeletonGroup className="hidden sm:flex" />
          <SkeletonGroup className="hidden lg:flex" />
        </div>
      )}

      <div className="flex gap-1 sm:gap-2 overflow-x-auto">
        {media?.slice(0, numToShow()).map((media: TrendingMedia) => {
          return <MediaPoster key={media.id} media={media} mediaType={type} />;
        })}
      </div>
    </div>
  );
};

export default TrendingNow;
