"use client";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Chip, Image, Spinner } from "@heroui/react";
import { Info, LucideProps } from "lucide-react";
import { fetchMediaLogo, getImageUrl, getTrending } from "@/lib/api/tmdb";
import { useQueries, useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import useIsMobile from "@/hooks/useIsMobile";
import { FaCalendar, FaPlayCircle, FaStar } from "react-icons/fa";
import { formatDate } from "@/lib/supabase/utils";
import { IconType } from "react-icons";

const BannerCarousel = ({ className }: { className?: string }) => {
  const { data: trending, isPending } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: getTrending,
  });
  const top5 = trending?.results?.slice(0, 5) || [];

  const logoQueries = useQueries({
    queries: top5.map((media: any) => ({
      queryKey: ["trendingLogo", media.id],
      queryFn: () => fetchMediaLogo(media.id, media.media_type),
      enabled: !!trending, // only run if trending is available
    })),
  });

  const isMobile = useIsMobile();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  if (isPending) {
    return (
      <div className="h-full w-full bg-slate-50 grid place-items-center">
        <Spinner size="lg" variant="simple" />
      </div>
    );
  }

  return (
    <div
      className={cn("overflow-hidden w-full h-full relative", className)}
      ref={emblaRef}
    >
      <div className="flex h-full">
        {top5.map((media: any, index: number) => {
          const name = media.title || media.name;
          const releaseDate = media.release_date || media.first_air_date;
          const logoURL: any = logoQueries[index]?.data;
          const logo = getImageUrl(logoURL);

          return (
            <div className="flex-[0_0_100%] relative h-full" key={media.id}>
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${media.backdrop_path})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t  from-black/80  to-black/25" />
                <div className="absolute bottom-0 left-0 text-white z-10 space-y-3 p-5 sm:p-10">
                  {logoURL ? (
                    <Image
                      src={logo}
                      className="w-[200px] sm:w-[350px]"
                      radius="none"
                    />
                  ) : (
                    <h2 className="text-2xl sm:text-4xl font-bold  sm:max-w-[30ch] line-clamp-1">
                      {name}
                    </h2>
                  )}

                  <div className="hidden sm:flex gap-3">
                    <MetadataChip
                      Icon={FaCalendar}
                      value={formatDate(releaseDate)}
                    />
                    <MetadataChip
                      Icon={FaPlayCircle}
                      value={media.media_type === "tv" ? "TV" : "Movie"}
                    />
                    <MetadataChip
                      value={media.vote_average.toFixed(1)}
                      Icon={FaStar}
                      fill
                    />
                  </div>

                  <p className="max-sm:hidden text-white/75 line-clamp-2 sm:line-clamp-3 text-sm lg:text-base max-w-[50ch]">
                    {media.overview}
                  </p>

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
                      className=" text-white bg-neutral-600"
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

      {/* Navigation Buttons */}
      <div className="hidden sm:block opacity-0">
        <Button
          isIconOnly
          size="sm"
          className="absolute left-4 top-1/2 z-20 text-white text-3xl cursor-pointer bg-neutral-700"
          onClick={scrollPrev}
        >
          ‹
        </Button>
        <Button
          isIconOnly
          size="sm"
          className="absolute right-4 top-1/2 z-20 text-white text-3xl cursor-pointer bg-neutral-700"
          onClick={scrollNext}
        >
          ›
        </Button>
      </div>

      {/* Step Indicators */}
      {scrollSnaps.length > 0 && (
        <div className="absolute sm:bottom-0 max-sm:top-1/2 sm:translate-0 -translate-y-1/2 p-5 right-0 flex flex-col  sm:flex-row gap-2 z-20">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                "w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-500 cursor-pointer",
                index === selectedIndex
                  ? "bg-yellow-400 max-sm:h-5 sm:w-5"
                  : "bg-white/50 hover:bg-white/80"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface MetadataChipProps {
  Icon:
    | IconType
    | React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
      >;
  value: string;
  fill?: boolean;
}
const MetadataChip = ({ Icon, value, fill = false }: MetadataChipProps) => {
  if (fill) {
    return (
      <Chip
        color="primary"
        size="sm"
        radius="sm"
        className="font-bold p-1"
        startContent={<Icon className="text-amber-300" size={15} />}
      >
        {value}
      </Chip>
    );
  }
  return (
    <div className="flex gap-1 items-center text-sm">
      <Icon />
      <p>{value}</p>
    </div>
  );
};

export default BannerCarousel;
