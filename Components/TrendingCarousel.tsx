"use client";

import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useQuery } from "@tanstack/react-query";
import { getTrending } from "@/lib/api/tmdb";
import { TrendingMedia } from "@/types/trending";
import { cn } from "@/lib/utils";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MediaPoster from "./MediaPoster";
import useIsMobile from "@/hooks/useIsMobile";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Skeleton } from "@heroui/skeleton";
import { Card } from "@heroui/card";

const TrendingCarousel = () => {
  const isMobile = useIsMobile();
  const {
    data: trending,
    isPending,
    error,
  } = useQuery({
    queryKey: ["trendingMedia"],
    queryFn: getTrending,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: isMobile ? true : false,
    slidesToScroll: 1,
    align: "start",
  });

  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi, trending]);

  if (isPending)
    return (
      <div
        className={cn(
          "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-1 sm:gap-3 px-2 sm:px-4 "
        )}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  if (error) return <div>Something went wrong</div>;

  return (
    <div>
      <div className="flex justify-between py-2 px-2 sm:px-4 items-end">
        {/* Heading */}
        <h2 className=" text-xl sm:text-3xl font-semibold dark:text-indigo-400">
          Top 10
        </h2>

        {/* Navigation Buttons */}
        <div className=" gap-1 hidden sm:flex">
          <Button
            isIconOnly
            size="sm"
            className=" text-white text-3xl cursor-pointer bg-neutral-700 dark:bg-primary"
            onPress={scrollPrev}
          >
            <FaChevronLeft size={14} />
          </Button>
          <Button
            isIconOnly
            size="sm"
            className="r text-white text-3xl cursor-pointer bg-neutral-700 dark:bg-primary"
            onPress={scrollNext}
          >
            <FaChevronRight size={14} />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div
        className=" flex justify-center sm:px-4 overflow-hidden "
        ref={emblaRef}
      >
        <div className="flex gap-1 sm:gap-2">
          {trending?.slice(0, 10).map((media: TrendingMedia, index: number) => {
            let name: string;
            let releaseDate: string;
            let url: string;

            if (media.media_type === "movie") {
              name = media.title;
              releaseDate = media.release_date;
              url = `/movie/${media.id}`;
            } else {
              name = media.name;
              releaseDate = media.first_air_date;
              url = `/tv/${media.id}`;
            }
            return (
              <MediaPoster
                key={media.id}
                media={media}
                className=" flex-[0_0_33.333%] sm:flex-[0_0_25%] md:flex-[0_0_20%] xl:flex-[0_0_15%] rounded-none sm:rounded-md"
                number={index + 1}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SkeletonCard = () => {
  return (
    <Card className="space-y-3 sm:space-y-5 p-4 " radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-15 sm:h-24 rounded-lg bg-default-900" />
      </Skeleton>
      <div className=" space-y-2 sm:space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-700" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-700" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-700" />
        </Skeleton>
      </div>
    </Card>
  );
};

export default TrendingCarousel;
