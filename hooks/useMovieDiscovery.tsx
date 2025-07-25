import { useQuery } from "@tanstack/react-query";
import { getMovieDiscovery } from "@/lib/api/tmdb";

export function useMovieDiscovery() {
  return useQuery({
    queryKey: ["discovery"],
    queryFn: getMovieDiscovery,
  });
}
