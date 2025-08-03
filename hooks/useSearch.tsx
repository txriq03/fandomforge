import { useQuery } from "@tanstack/react-query";
import { getSearch } from "@/lib/api/tmdb";
import { MediaType } from "@/types/trending";

export function useSearch(
  search: string,
  mediaType: MediaType,
  genres?: string,
  year?: string
) {
  return useQuery({
    queryKey: ["search", search, genres, year],
    queryFn: () => getSearch(search, mediaType),
    enabled: (mediaType === "movie" || mediaType === "tv") && !!search,
  });
}
