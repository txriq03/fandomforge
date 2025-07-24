import { useQuery } from "@tanstack/react-query";
import { getMovieGenres } from "@/lib/api/tmdb";

export function useMovieGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: getMovieGenres,
  });
}
