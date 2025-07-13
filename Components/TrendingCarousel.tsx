"use client";

import { getTrending } from "@/lib/api/tmdb";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";

const TrendingCarousel = () => {
  const {
    data: trending,
    isPending,
    error,
  } = useQuery({
    queryKey: ["trendingMedia"],
    queryFn: getTrending,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  return (
    <div className="px-4 h-[200px]">
      <h2 className="font-heading font-bold text-xl sm:text-4xl">Top 10 </h2>
      <div ref={emblaRef}>
        <div className="flex"></div>
      </div>
    </div>
  );
};

export default TrendingCarousel;
