"use client";
import React from "react";
import Padding from "./ui/Padding";
import { useAllReviews } from "@/hooks/useAllReviews";
import useIsMobile from "@/hooks/useIsMobile";
import useEmblaCarousel from "embla-carousel-react";
import { Alert } from "@heroui/alert";
import { Review } from "@/types/tables";
import ReviewCard from "./ReviewCard";

const ReviewCarousel = () => {
  const { data: reviews, isPending, error } = useAllReviews();
  const isMobile = useIsMobile();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true,
    slidesToScroll: 1,
    align: "start",
  });

  if (error)
    return <Alert title="Something went wrong" description={error.message} />;

  return (
    <div className=" py-10 space-y-2">
      <h2 className="px-2 sm:px-4  text-xl sm:text-3xl font-semibold dark:text-indigo-400 font-heading">
        Recent Reviews
      </h2>

      <div className="flex px-2 sm:px-4 overflow-hidden" ref={emblaRef}>
        <div className="flex gap-2">
          {reviews?.map((review: Review) => (
            <div className="flex-[0_0_250px]">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCarousel;
