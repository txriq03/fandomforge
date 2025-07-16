import { useQuery } from "@tanstack/react-query";
import { getBookmarks } from "@/lib/supabase/utils";

export function useBookmarks(userId: string) {
  return useQuery({
    queryKey: ["bookmarks", userId],
    queryFn: () => getBookmarks(userId),
    enabled: !!userId, // only run if userId is available
  });
}
