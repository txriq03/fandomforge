import { useQuery } from "@tanstack/react-query";
import { getNowPlaying } from "@/lib/api/tmdb";
import { MediaType } from "@/types/trending";

export function useNowPlaying(mediaType: MediaType = "movie") {
  return useQuery({
    queryKey: ["nowPlaying", mediaType],
    queryFn: () => getNowPlaying(mediaType),
  });
}
