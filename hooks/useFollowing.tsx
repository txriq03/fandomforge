import { getFollowing } from "@/lib/supabase/utils";
import { useQuery } from "@tanstack/react-query";

export function useFollowing() {
  return useQuery({
    queryKey: ["following"],
    queryFn: getFollowing,
  });
}
