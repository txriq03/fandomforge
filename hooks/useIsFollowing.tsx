import { isFollowing } from "@/lib/supabase/utils";
import { useQuery } from "@tanstack/react-query";

export function useIsFollowing(targetUserId: string | null) {
  return useQuery({
    queryKey: ["isFollowing", targetUserId],
    queryFn: () => isFollowing(targetUserId),
    enabled: !!targetUserId, // prevents query from running with undefined ID
  });
}
