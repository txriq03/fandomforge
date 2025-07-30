import { useQuery } from "@tanstack/react-query";
import { getTmdbReviews } from "@/lib/api/tmdb";
import { MediaType } from "@/types/trending";

export function useTmdbReviews(mediaId: string, mediaType: MediaType) {
  return useQuery({
    queryKey: ["tmdbReviews", mediaId, mediaType],
    queryFn: () => getTmdbReviews(mediaId, mediaType),
  });
}
