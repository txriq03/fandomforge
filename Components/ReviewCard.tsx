"use client";
import { getImageUrl } from "@/lib/api/tmdb";
import { getPfp } from "@/lib/supabase/utils";
import { timeago } from "@/lib/utils";
import { useUIContext } from "@/providers/UIContext";
import { Review } from "@/types/tables";
import { Avatar } from "@heroui/avatar";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Skeleton } from "@heroui/skeleton";

const ReviewCard = ({ review }: { review: Review }) => {
  const imageUrl = getImageUrl(review.backdrop_path);
  const { openProfileModal } = useUIContext();

  return (
    <div className="pb-7">
      <Card
        className="h-[220px] w-full bg-primary/5 relative overflow-visible group cursor-pointer font-main"
        radius="sm"
      >
        {/* Banner image */}
        <CardHeader className="h-[80px] overflow-hidden w-full p-0 relative">
          <Image
            src={imageUrl}
            radius="none"
            className="object-cover group-hover:brightness-50 transition-filter duration-300"
          />
          <p className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap hidden group-hover:block font-bold font-heading">
            Read Full Review
          </p>
        </CardHeader>

        <CardBody className="">
          <p className="line-clamp-2">
            Review for{" "}
            <span className="font-semibold">{review.media_title}</span>
          </p>

          <p className="text-foreground/70 text-sm line-clamp-2">
            {review.comment}
          </p>
        </CardBody>

        <button
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-pointer"
          onClick={() => openProfileModal(review.user_id)}
        >
          <Avatar
            src={getPfp(review.avatar_url)}
            size="lg"
            classNames={{
              base: "border-10 border-background h-18 w-18",
              img: "hover:brightness-75 transition-all duration-200",
            }}
          />
        </button>

        <p className="absolute text-[0.8rem] text-foreground/25 bottom-0 right-0 px-2 py-1">
          {timeago(review.created_at!)}
        </p>

        <p className="absolute text-[0.8rem] text-foreground/25 bottom-0 left-0 px-2 py-1">
          {review.username}
        </p>
      </Card>
    </div>
  );
};

export const ReviewCardSkeleton = () => {
  return (
    <Card
      className="p-0 flex-[0_0_250px] h-[220px] overflow-hidden bg-neutral-900"
      shadow="none"
    >
      <div className="space-y-2">
        <Skeleton className="bg-indigo-900">
          <div className="w-full h-[80px] bg-indigo-900" />
        </Skeleton>

        <div className="px-2 space-y-2">
          <Skeleton className="w-3/5 rounded-full h-3">
            <div className="rounded-full" />
          </Skeleton>

          <Skeleton className="w-2/5 rounded-full h-3">
            <div />
          </Skeleton>

          <Skeleton className="w-4/5 rounded-full h-3">
            <div />
          </Skeleton>
        </div>
      </div>
    </Card>
  );
};

export default ReviewCard;
