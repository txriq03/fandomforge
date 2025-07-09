import { getOwnProfile } from "@/lib/supabase/utils";
import { useQuery } from "@tanstack/react-query";

const useOwnProfile = (options = {}) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => getOwnProfile,
    ...options,
  });
};

export default useOwnProfile;
