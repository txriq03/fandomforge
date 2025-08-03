import { useQuery } from "@tanstack/react-query";
import { getSearchAndDiscovery } from "@/lib/api/tmdb";
import { MediaType } from "@/types/trending";

export function useSearchAndDiscovery(
  query: string,
  mediaType: MediaType,
  genres?: string,
  year?: string
) {
  return useQuery({
    queryKey: ["searchAndDiscovery", query, mediaType, genres, year],
    queryFn: () => getSearchAndDiscovery(query, mediaType, genres, year),
    enabled: (mediaType === "movie" || mediaType === "tv") && (!!query || !!genres || !!year),
  });
}