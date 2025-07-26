import { useQuery } from "@tanstack/react-query";
import { getMediaDiscovery } from "@/lib/api/tmdb";
import { MediaType } from "@/types/trending";

export function useMediaDiscovery(
  mediaType: MediaType = "movie",
  genres = "",
  year = ""
) {
  return useQuery({
    queryKey: ["discovery", mediaType, genres, year],
    queryFn: () => getMediaDiscovery(mediaType, genres, year),
  });
}
