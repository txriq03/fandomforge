import { getProfile } from "@/lib/supabase/utils";
import { useQuery } from "@tanstack/react-query";

const useProfile = (username: string, options = {}) => {
  return useQuery({
    queryKey: ["profile", username],
    queryFn: () => getProfile(username),
    enabled: !!username,
    ...options, // allow overrides like staleTime, retry, etc.
  });
};

export default useProfile;
