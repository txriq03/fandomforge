import { useQuery } from "@tanstack/react-query";
import { getMovieGenres, getTvGenres } from "@/lib/api/tmdb";
import { MediaType } from "@/types/trending";

export function useGenres(mediaType: MediaType) {
  return useQuery({
    queryKey: ["genres", mediaType],
    queryFn: mediaType === "movie" ? getMovieGenres : getTvGenres,
    enabled: mediaType === "movie" || mediaType === "tv",
  });
}