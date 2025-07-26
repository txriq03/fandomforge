"use client";

import { useSearchContext } from "@/providers/SearchProvider";
import SkeletonCard from "../SkeletonCard";
import { cn } from "@/lib/utils";
import MediaPoster from "../MediaPoster";
import { useParams } from "next/navigation";
import { MediaType } from "@/types/trending";

const SearchResults = () => {
  const params = useParams();
  const { data, isFetching } = useSearchContext();
  const { browseType } = params;

  const mediaType = browseType as MediaType;

  const results = data?.results;

  return (
    <div className="space-y-3">
      <h1 className="text-indigo-200 sm:text-lg lg:text-xl">Results</h1>

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
          <MediaPoster media={media} mediaType={mediaType} key={media.id} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
