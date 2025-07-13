"use client";
import React from "react";
import TrendingCarousel from "./BannerCarousel";
import { cn } from "@/lib/utils";

const CarouselAndRecentlyPlayed = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("h-[40vh] sm:h-[50vh] lg:h-[60vh] flex gap-2", className)}
    >
      <TrendingCarousel className="flex-4" />
    </div>
  );
};

export default CarouselAndRecentlyPlayed;
