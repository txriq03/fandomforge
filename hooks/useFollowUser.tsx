// hooks/useFollowUser.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser } from "@/lib/supabase/utils";
import { addToast } from "@heroui/toast";

export function useFollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: followUser,
    onSuccess: (_, followedId) => {
      // Refetch follow-related queries
      queryClient.invalidateQueries({ queryKey: ["following"] });
      queryClient.invalidateQueries({ queryKey: ["followers", followedId] });

      addToast({ title: "Followed", color: "success" });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error("Follow failed:", error.message);
        addToast({
          title: "Follow failed",
          description: error.message,
          color: "danger",
        });
      } else {
        console.error("Unknown follow error:", error);
      }
    },
  });
}
