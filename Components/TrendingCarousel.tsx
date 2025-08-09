"use client";

import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { TrendingMedia } from "@/types/trending";
import { cn } from "@/lib/utils";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MediaPoster from "./MediaPoster";
import useIsMobile from "@/hooks/useIsMobile";
import { Button } from "@heroui/button";
import { useTrending } from "@/hooks/useTrending";
import SkeletonCard from "./SkeletonCard";
import { Alert } from "@heroui/alert";
import Container from "./ui/Container";

const TrendingCarousel = () => {
  const isMobile = useIsMobile();
  const { data: trending, isPending, error } = useTrending();

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

  if (error)
    return (
      <Container>
        <Alert
          title="Something went wrong"
          description={error.message}
          color="danger"
        />
      </Container>
    );

  return (
    <Container>
      <div className="flex justify-between py-2 px-2 lg:pl-0 lg:pr-5 items-end">
        {/* Heading */}
        <h2 className=" text-xl sm:text-3xl font-semibold text-primary-light">
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
      {/* Skeleton  */}

      {isPending && (
        <div className={cn("flex gap-2 px-1 sm:px-4")}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard className="hidden sm:flex" />
          <SkeletonCard className="hidden lg:flex" />
          <SkeletonCard className="hidden xl:flex" />
        </div>
      )}
      {/* Carousel */}
      <div
        className=" flex justify-center px-0 overflow-hidden "
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
                mediaType={media.media_type}
                className=" flex-[0_0_33.333%] sm:flex-[0_0_25%] md:flex-[0_0_20%] xl:flex-[0_0_15%] rounded-none sm:rounded-md"
                number={index + 1}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default TrendingCarousel;
