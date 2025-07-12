"use client";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback } from "react";
import VoteAverageChip from "./VoteAverageChip";
import { Button, Chip, Spinner } from "@heroui/react";
import { Calendar, Info, LucideProps, Tv } from "lucide-react";
import { getTrending } from "@/lib/api/tmdb";
import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import useIsMobile from "@/hooks/useIsMobile";
import { MdLocalMovies } from "react-icons/md";
import { FaCalendar, FaPlayCircle } from "react-icons/fa";
import { formatDate } from "@/lib/supabase/utils";
import { IconType } from "react-icons";

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
      <div className="h-full w-full bg-slate-50  grid place-items-center">
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
          const releaseDate = media.release_date || media.first_air_date;
          return (
            <div className="flex-[0_0_100%] relative h-full" key={media.id}>
              <div
                className="w-full h-full  bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${media.backdrop_path})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/80 via-transparent to-black/40" />
                <div className="absolute bottom-0 left-0 text-white z-10 space-y-3 p-5 sm:p-10">
                  {/* Name */}
                  <h2 className="text-2xl sm:text-4xl font-bold font-heading  sm:max-w-[30ch] line-clamp-1">
                    {name}
                  </h2>

                  {/* Metadata */}
                  <div className="hidden sm:flex gap-3">
                    <MetadataChip
                      Icon={FaCalendar}
                      text={formatDate(releaseDate)}
                    />
                    <MetadataChip
                      Icon={FaPlayCircle}
                      text={media.media_type === "tv" ? "TV" : "Movie"}
                    />

                    <VoteAverageChip value={media.vote_average} />
                  </div>

                  {/* Overview */}
                  <p className="max-sm:hidden text-white/75 line-clamp-2 sm:line-clamp-3 text-sm  max-w-[50ch]">
                    {media.overview}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <Button
                      color="primary"
                      radius="sm"
                      size={isMobile ? "md" : "md"}
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
                      size={isMobile ? "md" : "md"}
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

interface MetadataChipProps {
  Icon:
    | IconType
    | React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
      >;
  text: string;
}
const MetadataChip = ({ Icon, text }: MetadataChipProps) => {
  return (
    <div className="flex gap-1 items-center text-sm">
      <Icon />
      <p>{text}</p>
    </div>
  );
};

export default TrendingCarousel;
