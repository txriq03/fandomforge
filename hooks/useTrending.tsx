import { useQuery } from "@tanstack/react-query";
import { getTrending } from "@/lib/api/tmdb";

type TrendingType = "all" | "movie" | "tv";

export function useTrending(mediaType: TrendingType = "all") {
  return useQuery({
    queryKey: ["trending", mediaType],
    queryFn: () => getTrending(mediaType),
  });
}
