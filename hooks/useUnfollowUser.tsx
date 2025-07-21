import { unfollowUser } from "@/lib/supabase/utils";
import { addToast } from "@heroui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUnfollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unfollowUser,
    onSuccess: (_, followedId) => {
      // Invalidate follow-related queries
      queryClient.invalidateQueries({ queryKey: ["following"] });
      queryClient.invalidateQueries({ queryKey: ["followers", followedId] });
      queryClient.invalidateQueries({ queryKey: ["isFollowing", followedId] });

      addToast({ title: "Unfollowed", color: "success" });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error("Unfollow failed:", error.message);
        addToast({
          title: "Unfollow failed",
          description: error.message,
          color: "danger",
        });
      } else {
        console.error("Unknown error during unfollow");
      }
    },
  });
}
