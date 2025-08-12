"use client";

import { useAllReviews } from "@/hooks/useAllReviews";
import { getImageUrl } from "@/lib/api/tmdb";
import { getPfp } from "@/lib/supabase/utils";
import { devLog, timeago } from "@/lib/utils";
import { Review } from "@/types/tables";
import { Avatar } from "@heroui/avatar";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import ReviewCard from "../ReviewCard";

const ReviewGrid = () => {
  const { data, isPending } = useAllReviews();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5  gap-2">
      {data?.map((review: Review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewGrid;
