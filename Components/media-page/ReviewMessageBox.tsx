"use client";
import useIsMobile from "@/hooks/useIsMobile";
import { createReview } from "@/lib/supabase/actions";
import { useMedia } from "@/providers/MediaProvider";
import { useUIContext } from "@/providers/UIContext";
import { useUser } from "@/providers/UserProvider";
import { Movie } from "@/types/movie";
import { MediaType } from "@/types/trending";
import TVSeries from "@/types/tv";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Form } from "@heroui/form";
import { Textarea } from "@heroui/input";
import { addToast } from "@heroui/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { TbStar, TbStarFilled, TbStarHalfFilled } from "react-icons/tb";

const ReviewMessageBox = () => {
  const user = useUser();
  const mediaDetails = useMedia();
  const media: Movie | TVSeries = mediaDetails;

  const mediaId = media.id;
  console.log("MediaID from messagebox", mediaId);
  const mediaType = media.media_type as MediaType;
  const isMobile = useIsMobile();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<Rating>(0);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const title =
    mediaType === "movie" ? (media as Movie).title : (media as TVSeries).name;

  if (!user) return <NoAuthBox />;

  const readyToSubmit = () => {
    return comment.trim() === "" || !rating ? false : true;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!readyToSubmit) return;

    setIsLoading(true);
    const result = await createReview({
      media_id: String(mediaId),
      media_type: mediaType,
      media_title: title,
      backdrop_path: media.backdrop_path ?? "",
      comment,
      rating,
    });

    if (result?.success) {
      addToast({ title: "Review submitted!", color: "success" });

      setRating(0);
      setComment("");

      // Invalidate review query to trigger refetch
      queryClient.invalidateQueries({
        queryKey: ["reviews", String(mediaId), mediaType],
      });
    } else {
      addToast({
        title: result?.error,
        description: result?.details,
        color: "danger",
      });
    }

    setIsLoading(false);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Textarea
        name="comment"
        isRequired
        minLength={5}
        maxLength={10000}
        label="Write your review"
        placeholder="What did you think?"
        value={comment}
        onValueChange={setComment}
        validate={(value) => {
          if (value.trim().length === 0) {
            return "Review cannot be less than 5 characters";
          }
          return true;
        }}
        classNames={{
          mainWrapper: "hover:bg-white",
          inputWrapper:
            "bg-black/5 hover:bg-white/5 data-focus:bg-black/10 border-primary/25 border-1 data-[hover=true]:bg-primary/10",
        }}
      />
      <div className="flex justify-between items-start w-full">
        <StarRating rating={rating} onChange={setRating} />
        <Button
          color="primary"
          radius="sm"
          size={isMobile ? "sm" : "md"}
          isDisabled={!readyToSubmit()}
          type="submit"
          isLoading={isLoading}
        >
          Submit
        </Button>
      </div>
    </Form>
  );
};

const NoAuthBox = () => {
  const { authModal } = useUIContext();

  return (
    <Card
      className="bg-black/15 border-primary border-1 border-dashed py-2"
      shadow="none"
    >
      <CardBody className="items-center space-y-3 text-center">
        <p className="text-primary-light text-sm sm:text-base">
          You need to be logged in to post a review.
        </p>
        <Button
          color="primary"
          className="min-w-[200px]"
          onPress={authModal.onOpen}
        >
          Sign in
        </Button>
      </CardBody>
    </Card>
  );
};

type Rating = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface StarRatingProps {
  rating?: Rating;
  onChange?: (value: Rating) => void;
}

const StarRating = ({ rating = 0 as Rating, onChange }: StarRatingProps) => {
  const isMobile = useIsMobile();
  const [hover, setHover] = useState<number | null>(null);

  const ratingValue = rating / 2; // Convert to 0.5 scale for internal use (e.g., 7 -> 3.5 stars)

  const handleCycleClick = (starIndex: number) => {
    const starValue = starIndex + 1;

    const currentValue =
      ratingValue >= starValue ? 1 : ratingValue >= starValue - 0.5 ? 0.5 : 0;

    let nextValue: number;

    if (currentValue === 0) nextValue = (starValue - 0.5) * 2;
    else if (currentValue === 0.5) nextValue = starValue * 2;
    else nextValue = (starValue - 1) * 2;

    const clampedValue = Math.max(1, Math.min(10, nextValue));

    onChange?.(clampedValue as Rating);
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const hoverX = event.clientX - rect.left;
    const half = rect.width / 2;

    const isLeftHalf = hoverX < half;
    const hoverValue = isLeftHalf ? index + 0.5 : index + 1;

    setHover(hoverValue);
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        const displayValue = hover ?? ratingValue;

        let starType: "empty" | "half" | "full" = "empty";
        if (displayValue >= starValue) starType = "full";
        else if (displayValue >= starValue - 0.5) starType = "half";

        return (
          <button
            type="button"
            key={index}
            onClick={() => handleCycleClick(index)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => setHover(null)}
            className="cursor-pointer px-[2px]"
          >
            {starType === "full" ? (
              <TbStarFilled
                size={isMobile ? 21 : 24}
                className="text-yellow-400"
              />
            ) : starType === "half" ? (
              <TbStarHalfFilled
                size={isMobile ? 21 : 24}
                className="text-yellow-400"
              />
            ) : (
              <TbStar size={isMobile ? 21 : 24} />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ReviewMessageBox;
