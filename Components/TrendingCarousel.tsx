"use client";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback } from "react";
import VoteAverageChip from "./VoteAverageChip";
import { Button, Chip, Spinner } from "@heroui/react";
import { Clapperboard, Info, Tv } from "lucide-react";
import { getTrending } from "@/lib/api/tmdb";
import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import useIsMobile from "@/hooks/useIsMobile";

const TrendingCarousel = ({ className }: { className?: string }) => {
  const {
    data: trending,
    isPending,
    error,
  } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: getTrending,
  });

  const isMobile = useIsMobile();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);

  if (isPending) {
    return (
      <div className="h-full w-full bg-slate-50 outline-1 outline-primary grid place-items-center">
        <Spinner size="lg" variant="simple" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden w-full h-full lg:rounded-xl relative",
        className
      )}
      ref={emblaRef}
    >
      <div className="flex h-full">
        {trending.results.slice(0, 5).map((media: any) => {
          const name = media.title || media.name;
          return (
            <div className="flex-[0_0_100%] relative h-full" key={media.id}>
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${media.backdrop_path})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                <div className="absolute bottom-0 left-0 text-white z-10 space-y-3 p-5 sm:p-10">
                  {/* Name */}
                  <h2 className="text-2xl sm:text-4xl font-bold font-heading">
                    {name}
                  </h2>

                  {/* Metadata */}
                  <div className="hidden sm:flex gap-2">
                    <VoteAverageChip value={media.vote_average} />

                    <Chip
                      className="text-sm pl-2 bg-purple-500 text-white"
                      size="sm"
                      startContent={
                        media.media_type === "movie" ? (
                          <Clapperboard size={16} />
                        ) : (
                          <Tv size={16} />
                        )
                      }
                    >
                      {media.media_type}
                    </Chip>
                  </div>

                  {/* Overview */}
                  <p className="max-sm:hidden text-white/75 line-clamp-2 sm:line-clamp-3 text-sm sm:text-base">
                    {media.overview}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <Button
                      color="primary"
                      radius="sm"
                      size={isMobile ? "md" : "lg"}
                    >
                      Play Now
                    </Button>
                    <Button
                      as={Link}
                      href={
                        media.media_type === "movie"
                          ? `/movie/${media.id}`
                          : `/tv/${media.id}`
                      }
                      isIconOnly
                      className="bg-pink-500 text-white"
                      radius="sm"
                      size={isMobile ? "md" : "lg"}
                    >
                      <Info size={isMobile ? 18 : 24} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Nav Buttons */}
      <div className="hidden sm:block">
        <button
          className="absolute left-4 top-1/2 z-20 text-white text-3xl"
          onClick={scrollPrev}
        >
          ‹
        </button>
        <button
          className="absolute right-4 top-1/2 z-20 text-white text-3xl"
          onClick={scrollNext}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default TrendingCarousel;
