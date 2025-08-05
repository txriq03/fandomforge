import { useQuery } from "@tanstack/react-query";
import { fetchInitialGlobalMessages } from "@/lib/supabase/utils";

export function useGlobalMessages() {
  return useQuery({
    queryKey: ["globalMessages"],
    queryFn: fetchInitialGlobalMessages,
  });
}
