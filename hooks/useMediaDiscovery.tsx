import { useQuery } from "@tanstack/react-query";
import { getMediaDiscovery } from "@/lib/api/tmdb";
import { MediaType } from "@/types/trending";

export function useMediaDiscovery(mediaType: MediaType = "movie") {
  return useQuery({
    queryKey: ["discovery"],
    queryFn: () => getMediaDiscovery(mediaType),
  });
}
