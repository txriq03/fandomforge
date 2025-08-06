"use client";
import { useAllReviews } from "@/hooks/useAllReviews";
import useEmblaCarousel from "embla-carousel-react";
import { Review } from "@/types/tables";
import ReviewCard, { ReviewCardSkeleton } from "./ReviewCard";
import { Link } from "@heroui/link";
import { TbChevronRight } from "react-icons/tb";

const ReviewCarousel = () => {
  const { data: reviews, isPending, error } = useAllReviews();
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    dragFree: true,
    slidesToScroll: 1,
    align: "start",
  });

  if (error) {
    console.log("Error retrieving all reviews:", error.message);
    return null;
  }

  return (
    <div className=" py-10 space-y-2">
      <div className="flex justify-between items-end px-2 sm:px-4">
        <h2 className="  text-xl sm:text-2xl  text-primary-light font-heading">
          Recent Reviews
        </h2>

        {!isPending && reviews.length > 5 && (
          <Link
            size="sm"
            color="primary"
            href="/browse/reviews"
            className="text-primary-light"
            isBlock
            showAnchorIcon
            anchorIcon={<TbChevronRight />}
          >
            All Reviews
          </Link>
        )}
      </div>

      <div className="flex px-2 sm:px-4 overflow-hidden" ref={emblaRef}>
        <div className="flex gap-2">
          {isPending
            ? [...Array(5)].map((_, index) => (
                <ReviewCardSkeleton key={index} />
              ))
            : reviews?.map((review: Review) => (
                <div className="flex-[0_0_250px]" key={review.id}>
                  <ReviewCard review={review} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCarousel;
