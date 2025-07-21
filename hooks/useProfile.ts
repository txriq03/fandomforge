import { getProfile } from "@/lib/supabase/utils";
import { useQuery } from "@tanstack/react-query";

const useProfile = (userId: string | null | undefined, options = {}) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getProfile(userId),
    enabled: !!userId,
    ...options,
  });
};

export default useProfile;
