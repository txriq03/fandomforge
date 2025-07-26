"use client";

import { useSearchContext } from "@/providers/SearchProvider";
import SkeletonCard from "../SkeletonCard";
import { cn } from "@/lib/utils";
import MediaPoster from "../MediaPoster";

const SearchResults = () => {
  const { data, isFetching } = useSearchContext();

  const results = data?.results;

  return (
    <div className="space-y-5">
      <h1>Results</h1>

      {isFetching && (
        <div className="flex gap-1 sm:gap-2 lg:gap-2">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard className="hidden sm:flex" />
          <SkeletonCard className="hidden lg:flex" />
          <SkeletonCard className="hidden xl:flex" />
        </div>
      )}

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
        {results?.map((media, index) => (
          <MediaPoster media={media} mediaType="movie" key={media.id} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
