"use client";
import { useReviewsForMedia } from "@/hooks/useMediaReview";
import { getPfp } from "@/lib/supabase/utils";
import { Review } from "@/types/tables";
import { MediaType } from "@/types/trending";
import { Alert } from "@heroui/alert";
import { Avatar } from "@heroui/avatar";
import { Card, CardBody } from "@heroui/card";
import { Spinner } from "@heroui/spinner";
import ReviewStarRating from "./ReviewStarRating";
import { devLog, timeago } from "@/lib/utils";
import { Button } from "@heroui/button";
import { TbHeart, TbMessage } from "react-icons/tb";
import { useUIContext } from "@/providers/UIContext";
import { useMedia } from "@/providers/MediaProvider";
import { Movie } from "@/types/movie";
import TVSeries from "@/types/tv";
import { Switch } from "@heroui/switch";
import { useState } from "react";
import { useTmdbReviews } from "@/hooks/useTmdbReviews";
import { TmdbReview } from "@/types/tmdb";
import { getImageUrl } from "@/lib/api/tmdb";
import Link from "next/link";

const Reviews = () => {
  const mediaDetails = useMedia();
  const media: Movie | TVSeries = mediaDetails;
  const mediaId = String(media?.id);
  const mediaType = media?.media_type as MediaType;

  // For switch
  const [showTMDB, setShowTMDB] = useState(false);

  const {
    data: reviews,
    isPending,
    error,
  } = useReviewsForMedia(mediaId, mediaType);
  devLog.log("Reviews:", reviews);

  const { data: tmdbReviewResponse } = useTmdbReviews(
    mediaId,
    mediaType,
    showTMDB
  );
  const tmdbReviews = tmdbReviewResponse?.results;
  devLog.log("TMDB Reviews:", tmdbReviews);

  if (isPending) {
    return (
      <Card className="bg-primary/1 py-2" shadow="none">
        <CardBody>
          <Spinner variant="simple" />
        </CardBody>
      </Card>
    );
  }

  if (error)
    return (
      <Alert
        title="Something went wrong"
        description={error.message}
        color="danger"
      />
    );

  return (
    <>
      <div className="pt-10 pb-2 text-sm sm:text-lg text-foreground/60 font-light flex justify-between items-end">
        <p>Reviews</p>
        <Switch
          size="sm"
          classNames={{
            label: "text-teal-500",
          }}
          isSelected={showTMDB}
          onValueChange={setShowTMDB}
        >
          TMDB
        </Switch>
      </div>
      <div className="flex flex-col gap-2">
        {showTMDB ? (
          tmdbReviews?.length === 0 ? (
            <Alert
              title="No TMDB reviews"
              description="No reviews for this media"
            />
          ) : (
            tmdbReviews?.map((review: TmdbReview) => (
              <TmdbReviewCard review={review} key={review.id} />
            ))
          )
        ) : reviews.length === 0 ? (
          <Alert title="No reviews" description="No reviews for this media" />
        ) : (
          reviews.map((review: Review) => (
            <ReviewCard review={review} key={review.id} />
          ))
        )}
      </div>
    </>
  );
};

const ReviewCard = ({ review }: { review: Review }) => {
  const avatar = getPfp(review.avatar_url);
  const { openProfileModal } = useUIContext();

  return (
    <Card className="bg-transparent" shadow="none">
      <CardBody className="flex-row gap-2 px-0">
        <Button
          radius="full"
          isIconOnly
          onPress={() => openProfileModal(review.user_id)}
        >
          <Avatar src={avatar} />
        </Button>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex gap-2 items-center">
            <p className="text-foreground/75 text-sm">{review.username}</p>
            <p className="text-foreground/25">•</p>
            <div className="text-[0.8rem]">
              {review.rating && <ReviewStarRating rating={review.rating} />}
            </div>
          </div>

          <p className="text-[0.75rem] sm:text-[0.8rem] md:text-[0.9rem] font-light line-clamp-4">
            {review.comment}
          </p>

          <div className="flex gap-2 items-center">
            <p className="text-[0.7rem] text-foreground/30">
              {timeago(review.created_at!)}
            </p>
            <p className="text-foreground/30">•</p>

            {/* Buttons */}
            <div className="flex gap-1">
              <Button isIconOnly variant="light" size="sm" aria-label="like">
                <TbHeart size={18} />
              </Button>
              <Button isIconOnly variant="light" size="sm" aria-label="reply">
                <TbMessage size={18} />
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

const TmdbReviewCard = ({ review }: { review: TmdbReview }) => {
  const avatar = getImageUrl(review.author_details.avatar_path);
  const { openProfileModal } = useUIContext();

  return (
    <Card className="bg-transparent" shadow="none">
      <CardBody className="flex-row gap-2 px-0">
        <Button radius="full" isIconOnly as={Link} href={review.url}>
          <Avatar src={avatar} />
        </Button>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex gap-2 items-center">
            <p className="text-foreground/75 text-sm">
              {review.author_details.username}
            </p>
            {/* <p className="text-foreground/25">•</p>
            <div className="text-[0.8rem]">
              {review.rating && <ReviewStarRating rating={review.rating} />}
            </div> */}
          </div>

          <p className="text-[0.75rem] sm:text-[0.8rem] md:text-[0.9rem] font-light line-clamp-4">
            {review.content}
          </p>

          <div className="flex gap-2 items-center">
            <p className="text-[0.7rem] text-foreground/30">
              {timeago(review.created_at!)}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Reviews;
