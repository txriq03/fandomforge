"use client";
import React from "react";
import SearchResults from "./SearchResults";
import PopularNow from "./PopularNow";
import TrendingNow from "./TrendingNow";
import NowPlaying from "./NowPlaying";
import { BrowseType } from "@/types/browseType";
import { useSearchParams } from "next/navigation";
import ReviewGrid from "./ReviewGrid";

const MainSection = ({ browseType }: { browseType: BrowseType }) => {
  const searchParams = useSearchParams();

  // Check if any query parameters are present (e.g. query, genre, year)
  const hasFilters = Array.from(searchParams.entries()).length > 0;

  const isMovie = browseType === "movie";
  const isReview = browseType === "reviews";

  if (hasFilters) {
    return <SearchResults />;
  }

  return (
    <>
      {!isReview && (
        <>
          <PopularNow />
          <TrendingNow />
        </>
      )}
      {isMovie && <NowPlaying />}
      {isReview && <ReviewGrid />}
    </>
  );
};

export default MainSection;
