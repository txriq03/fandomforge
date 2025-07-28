import { useQuery } from "@tanstack/react-query";
import { getAllReviews } from "@/lib/supabase/utils";

export function useAllReviews() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: getAllReviews,
  });
}
