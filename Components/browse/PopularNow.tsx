"use client";
import { useMediaDiscovery } from "@/hooks/useMediaDiscovery";
import React from "react";
import MediaPoster from "../MediaPoster";
import { MediaType } from "@/types/trending";
import { useParams } from "next/navigation";
import useIsMobile from "@/hooks/useIsMobile";
import { Button } from "@heroui/button";
import Link from "next/link";
import { DiscoverMovie, DiscoverTVSeries } from "@/types/movie";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import SkeletonGroup from "./SkeletonCard";

const PopularNow = () => {
  const { browseType } = useParams();
  const type = browseType as MediaType;
  const { data, isPending } = useMediaDiscovery(type);
  type DiscoverMedia = DiscoverMovie | DiscoverTVSeries;
  const media: DiscoverMedia[] = data?.results;
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
        {media?.slice(0, numToShow()).map((media: DiscoverMedia) => {
          return <MediaPoster key={media.id} media={media} mediaType={type} />;
        })}
      </div>
    </div>
  );
};

export default PopularNow;
