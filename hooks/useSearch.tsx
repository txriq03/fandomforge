import { useQuery } from "@tanstack/react-query";
import { getSearch } from "@/lib/api/tmdb";
import { MediaType } from "@/types/trending";

export function useSearch(query: string, mediaType: MediaType) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => getSearch(query, mediaType),
  });
}
