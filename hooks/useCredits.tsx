import { useQuery } from "@tanstack/react-query";
import { getCredits } from "@/lib/api/tmdb";
import { MediaType } from "@/types/trending";

export function useCredits(mediaId: string, mediaType: MediaType = "movie") {
  return useQuery({
    queryKey: ["credits", mediaType, mediaId],
    queryFn: () => getCredits(mediaId, mediaType),
    enabled: !!mediaId,
  });
}
