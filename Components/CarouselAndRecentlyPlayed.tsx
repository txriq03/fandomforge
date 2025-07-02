"use client";
import React from "react";
import PopularCarousel from "./PopularCarousel";
import { Card, CardHeader } from "@heroui/react";

const CarouselAndRecentlyPlayed = () => {
  return (
    <div className="h-[40vh] sm:h-[50vh] lg:h-[60vh] flex gap-2">
      <PopularCarousel className="flex-4" />
      {/* <Card className="hidden md:block h-full min-w-[200px] flex-1">
        <CardHeader>
          <p>Recently Played</p>
        </CardHeader>
      </Card> */}
    </div>
  );
};

export default CarouselAndRecentlyPlayed;
