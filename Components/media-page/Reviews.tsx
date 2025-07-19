"use client";
import { useReviewsForMedia } from "@/hooks/useMediaReview";
import { Review } from "@/types/tables";
import { MediaType } from "@/types/trending";
import { Alert } from "@heroui/alert";
import { Card, CardBody } from "@heroui/card";
import { useParams } from "next/navigation";

const Reviews = () => {
  const params = useParams();
  const mediaId = params.id as string;
  const mediaType = params.media_type as MediaType;

  const { data: reviews, isPending } = useReviewsForMedia(mediaId, mediaType);
  console.log("Reviews:", reviews);

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
  return (
    <Card className="bg-primary/5" shadow="none">
      <CardBody>
        <p>{review.comment}</p>
      </CardBody>
    </Card>
  );
};

export default Reviews;
