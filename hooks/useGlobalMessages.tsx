import { useQuery } from "@tanstack/react-query";
import { fetchInitialGlobalMessages } from "@/lib/supabase/utils";

export function useGlobalMessages() {
  return useQuery({
    queryKey: ["global_messages"],
    queryFn: fetchInitialGlobalMessages,
  });
}
