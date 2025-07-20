"use client";
import { useReviewsForMedia } from "@/hooks/useMediaReview";
import { getPfp } from "@/lib/supabase/utils";
import { Review } from "@/types/tables";
import { MediaType } from "@/types/trending";
import { Alert } from "@heroui/alert";
import { Avatar } from "@heroui/avatar";
import { Card, CardBody } from "@heroui/card";
import { Spinner } from "@heroui/spinner";
import { useParams } from "next/navigation";
import ReviewStarRating from "./ReviewStarRating";
import { timeago } from "@/lib/utils";
import { Button } from "@heroui/button";
import { TbHeart, TbMessage } from "react-icons/tb";

const Reviews = () => {
  const params = useParams();
  const mediaId = params.id as string;
  const mediaType = params.media_type as MediaType;

  const { data: reviews, isPending } = useReviewsForMedia(mediaId, mediaType);
  console.log("Reviews:", reviews);

  if (isPending) {
    return (
      <Card className="bg-primary/1 py-2" shadow="none">
        <CardBody>
          <Spinner variant="simple" />
        </CardBody>
      </Card>
    );
  }

  if (!reviews || reviews.length === 0) {
    return <Alert title="No reviews" description="No reviews for this media" />;
  }

  return (
    <div className="flex flex-col gap-2">
      {reviews.map((review: Review) => (
        <ReviewCard review={review} key={review.id} />
      ))}
    </div>
  );
};

const ReviewCard = ({ review }: { review: Review }) => {
  const avatar = getPfp(review.avatar_url);
  return (
    <Card className="bg-transparent" shadow="none">
      <CardBody className="flex-row gap-2 px-0">
        <div>
          <Avatar src={avatar} />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex gap-2 items-center">
            <p className="text-foreground/75 text-sm">{review.username}</p>
            <p className="text-foreground/25">•</p>
            <div className="text-[0.8rem]">
              {review.rating && <ReviewStarRating rating={review.rating} />}
            </div>
          </div>

          <p className="text-[0.75rem] sm:text-[0.8rem] md:text-[0.9rem] font-light line-clamp-3">
            {review.comment}
          </p>

          <div className="flex gap-1 items-center">
            <p className="text-[0.7rem] text-foreground/30">
              {timeago(review.created_at!)}
            </p>
            <p className="text-foreground/30">•</p>
            <Button isIconOnly variant="light" size="sm">
              <TbHeart size={18} />
            </Button>
            <Button isIconOnly variant="light" size="sm">
              <TbMessage size={18} />
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Reviews;
