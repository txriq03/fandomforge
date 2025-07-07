"use client";
import { cn } from "@/lib/utils";
import { useDashbaord } from "@/providers/DashboardContext";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback } from "react";
import VoteAverageChip from "./VoteAverageChip";
import { Chip, Spinner } from "@heroui/react";
import { BiMovie } from "react-icons/bi";
import { Clapperboard, Tv } from "lucide-react";

const TrendingCarousel = ({ className }: { className?: string }) => {
  const { trending, isPending } = useDashbaord();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);

  if (isPending) {
    return (
      <div className="h-full w-full bg-slate-50 outline-1 outline-primary rounded-lg grid place-items-center">
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
                <div className="absolute bottom-0 left-0 text-white z-10 space-y-3 p-7">
                  {/* Name */}
                  <h2 className="text-lg sm:text-4xl font-bold font-heading">
                    {name}
                  </h2>

                  {/* Metadata */}
                  <div className="flex gap-2">
                    <VoteAverageChip value={media.vote_average} />

                    <Chip
                      className="text-sm pl-2 bg-primary-light text-white"
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
                  <p className="text-white/75 line-clamp-3 text-sm sm:text-base">
                    {media.overview}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Optional Nav Buttons */}
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
  );
};

export default TrendingCarousel;
