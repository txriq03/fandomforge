import { useQuery } from "@tanstack/react-query";
import { getGenres } from "@/lib/api/tmdb";
import { MediaType } from "@/types/trending";

export function useGenres(mediaType: MediaType) {
  return useQuery({
    queryKey: ["genres", mediaType],
    queryFn: () => getGenres(mediaType),
    enabled: mediaType === "movie" || mediaType === "tv",
  });
}
