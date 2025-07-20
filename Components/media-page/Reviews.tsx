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
    <>
      {reviews.map((review: Review) => (
        <ReviewCard review={review} key={review.id} />
      ))}
    </>
  );
};

const ReviewCard = ({ review }: { review: Review }) => {
  const avatar = getPfp(review.avatar_url);
  return (
    <Card className="bg-primary/5" shadow="none">
      <CardBody className="flex-row gap-2">
        <Avatar src={avatar} />
        <div className="flex flex-col gap-1">
          <p className="text-foreground/75">{review.username}</p>
          <p className="text-sm lg:text-base ">{review.comment}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default Reviews;
