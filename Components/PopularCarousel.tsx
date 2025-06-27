"use client";
import { cn } from "@/lib/utils";
import { useDashbaord } from "@/providers/DashboardContext";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback } from "react";
import VoteAverageChip from "./VoteAverageChip";

const PopularCarousel = ({ className }: { className?: string }) => {
  const { popularMovies, isPending } = useDashbaord();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);

  if (isPending) {
    return <div></div>;
  }

  return (
    <div
      className={cn(
        "overflow-hidden w-full h-full rounded-xl relative",
        className
      )}
      ref={emblaRef}
    >
      <div className="flex h-full">
        {popularMovies.results.slice(0, 5).map((movie: any) => (
          <div className="flex-[0_0_100%] relative h-full" key={movie.id}>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
              <div className="absolute bottom-0 left-0 text-white z-10 space-y-3 p-7">
                <h2 className="text-lg sm:text-2xl font-bold">{movie.title}</h2>
                <VoteAverageChip value={movie.vote_average} />
                <p className="text-white/75 line-clamp-3 text-sm sm:text-base">
                  {movie.overview}
                </p>
              </div>
            </div>
          </div>
        ))}
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

export default PopularCarousel;
