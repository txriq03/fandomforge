import { useQuery } from "@tanstack/react-query";
import { getReviewsForMedia } from "@/lib/supabase/utils"; // adjust path as needed
import { Review } from "@/types/tables"; // optional

export function useReviewsForMedia(
  media_id: string,
  media_type: "movie" | "tv"
) {
  return useQuery<Review[]>({
    queryKey: ["reviews", media_id, media_type],
    queryFn: () => getReviewsForMedia(media_id, media_type),
    enabled: !!media_id && !!media_type, // prevents running with undefined
  });
}
