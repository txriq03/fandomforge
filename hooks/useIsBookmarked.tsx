import { isBookmarked } from "@/lib/supabase/utils";
import { useQuery } from "@tanstack/react-query";

type UseIsBookmarkedProps = {
  media_id: number;
  media_type: "movie" | "tv";
  profile_id: string;
};

export function useIsBookmarked({
  media_id,
  media_type,
  profile_id,
}: UseIsBookmarkedProps) {
  return useQuery({
    queryKey: ["isBookmarked", profile_id, media_id, media_type],
    queryFn: () => isBookmarked({ media_id, media_type, profile_id }),
    enabled: !!profile_id && !!media_id && !!media_type, // only run if values are defined
  });
}
