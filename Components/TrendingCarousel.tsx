"use client";

import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useQuery } from "@tanstack/react-query";
import { getImageUrl, getTrending } from "@/lib/api/tmdb";
import { Button, Image } from "@heroui/react";
import { TrendingMedia } from "@/types/trending";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MediaPoster from "./MediaPoster";
import useIsMobile from "@/hooks/useIsMobile";
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

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <div>
      <div className="flex justify-between py-2 px-2 sm:px-4 items-end">
        {/* Heading */}
        <h2 className=" text-xl sm:text-3xl font-semibold">Top 10</h2>

        {/* Navigation Buttons */}
        <div className=" gap-1 hidden sm:flex">
          <Button
            isIconOnly
            size="sm"
            className=" text-white text-3xl cursor-pointer bg-neutral-700"
            onPress={scrollPrev}
          >
            <FaChevronLeft size={14} />
          </Button>
          <Button
            isIconOnly
            size="sm"
            className="r text-white text-3xl cursor-pointer bg-neutral-700"
            onPress={scrollNext}
          >
            <FaChevronRight size={14} />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div className=" flex justify-center px-2 sm:px-4" ref={emblaRef}>
        <div className="flex gap-[2px] sm:gap-2">
          {trending?.results
            ?.slice(0, 10)
            .map((media: TrendingMedia, index: number) => {
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
                  media={media}
                  className=" flex-[0_0_33.33%] sm:flex-[0_0_20%] lg:flex-[0_0_15%]"
                  number={index + 1}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TrendingCarousel;
