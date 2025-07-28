"use client";

import { useAllReviews } from "@/hooks/useAllReviews";
import { getImageUrl } from "@/lib/api/tmdb";
import { getPfp } from "@/lib/supabase/utils";
import { devLog } from "@/lib/utils";
import { Review } from "@/types/tables";
import { Avatar } from "@heroui/avatar";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";

const ReviewGrid = () => {
  const { data, isPending } = useAllReviews();
  devLog.log("Reviews:", data);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5  gap-2">
      {data?.map((review: Review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

const ReviewCard = ({ review }: { review: Review }) => {
  const imageUrl = getImageUrl(review.backdrop_path);
  return (
    <Card
      className="h-[200px] w-full bg-primary/5 relative overflow-visible group cursor-pointer"
      radius="sm"
    >
      {/* Banner image */}
      <CardHeader className="h-[100px] overflow-hidden w-full p-0 group-hover:brightness-50 transition-filter duration-300 relative">
        <Image src={imageUrl} radius="none" className="object-cover" />

        <p className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap hidden hover:block">
          Read full review
        </p>
      </CardHeader>

      <CardBody>
        <p className="text-foreground/70 text-sm line-clamp-2">
          {review.comment}
        </p>
      </CardBody>

      <Avatar
        src={getPfp(review.avatar_url)}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
        size="lg"
        classNames={{
          base: "border-10 border-background h-18 w-18",
        }}
      />
    </Card>
  );
};
export default ReviewGrid;
