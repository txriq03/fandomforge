"use client";

import { useSearchContext } from "@/providers/SearchProvider";
import SkeletonCard from "../SkeletonCard";
import MediaPoster from "../MediaPoster";
import { useParams } from "next/navigation";
import { MediaType } from "@/types/trending";

const SearchResults = () => {
  const params = useParams();
  const { data, isFetching, query, genres, year } = useSearchContext();
  const { browseType } = params;

  const mediaType = browseType as MediaType;

  // Combine search results and filtered results, prioritizing search results
  const searchResults = data?.searchResults || [];
  const filteredResults = data?.filteredResults || [];
  
  // If there's a search query, show search results first, then filtered results
  // If there's no search query, just show filtered results
  const results = query 
    ? [...searchResults, ...filteredResults.filter(item => 
        !searchResults.some(searchItem => searchItem.id === item.id)
      )]
    : filteredResults;

  const hasFilters = genres || year;
  const showingFiltered = hasFilters && !query;
  const showingSearchAndFiltered = query && hasFilters;

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <h1 className="text-indigo-200 sm:text-lg lg:text-xl">
          {showingSearchAndFiltered 
            ? "Search & Filter Results" 
            : showingFiltered 
            ? "Filtered Results" 
            : "Search Results"
          }
        </h1>
        {hasFilters && (
          <p className="text-sm text-indigo-200/60">
            {genres && `Genres: ${genres.split(',').join(', ')}`}
            {genres && year && " • "}
            {year && `Year: ${year}`}
          </p>
        )}
      </div>

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

      {!isFetching && results.length === 0 && (
        <p className="text-indigo-200/60 text-center py-8">
          No results found. Try adjusting your search or filters.
        </p>
      )}

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
        {results?.map((media, index) => (
          <MediaPoster media={media} mediaType={mediaType} key={`${media.id}-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;