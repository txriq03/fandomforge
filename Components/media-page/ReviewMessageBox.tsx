"use client";
import useIsMobile from "@/hooks/useIsMobile";
import { createReview } from "@/lib/supabase/actions";
import { useUIContext } from "@/providers/UIContext";
import { useUser } from "@/providers/UserProvider";
import { MediaType } from "@/types/trending";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Form } from "@heroui/form";
import { Textarea } from "@heroui/input";
import { addToast } from "@heroui/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { TbStar, TbStarFilled } from "react-icons/tb";

const ReviewMessageBox = () => {
  const user = useUser();
  const params = useParams();
  const mediaId = params.id as string;
  const mediaType = params.media_type as MediaType;
  const isMobile = useIsMobile();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  if (!user) return <NoAuthBox />;

  const readyToSubmit = () => {
    return comment.trim() === "" || !rating ? false : true;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!readyToSubmit) return;

    setIsLoading(true);
    const result = await createReview({
      media_id: mediaId,
      media_type: mediaType,
      comment,
      rating,
    });

    if (result?.success) {
      addToast({ title: "Review submitted!", color: "success" });

      // Invalidate review query to trigger refetch
      queryClient.invalidateQueries({
        queryKey: ["reviews", mediaId, mediaType],
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
        maxLength={200}
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

interface StarRatingProps {
  rating?: number;
  onChange?: (value: number) => void;
}
const StarRating = ({ rating = 0, onChange }: StarRatingProps) => {
  const isMobile = useIsMobile();
  const [hover, setHover] = useState<number | null>(null);
  const [current, setCurrent] = useState(rating);

  const handleClick = (value: number) => {
    setCurrent(value);
    onChange?.(value);
  };

  return (
    <div className="flex  ">
      {[...Array(5)].map((_, index: number) => {
        const value = index + 1;
        const isFilled = value <= (hover ?? current);
        return (
          <button
            type="button"
            key={value}
            onClick={() => handleClick(value)}
            className="cursor-pointer  px-[2px]"
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(null)}
          >
            {isFilled ? (
              <TbStarFilled
                size={isMobile ? 21 : 24}
                className="text-yellow-400 cursor-pointer"
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
