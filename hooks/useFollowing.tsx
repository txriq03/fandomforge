import { getFollowing } from "@/lib/supabase/utils";
import { useUser } from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";

export function useFollowing() {
  const user = useUser();
  return useQuery({
    queryKey: ["following"],
    queryFn: getFollowing,
    enabled: !!user,
  });
}
