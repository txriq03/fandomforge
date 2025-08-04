import Rating from "@/types/rating";
import React from "react";
import { TbStar, TbStarFilled, TbStarHalfFilled } from "react-icons/tb";

const ReviewStarRating = ({ rating }: { rating: Rating }) => {
  if (!rating) return null;
  const starRating = rating / 2;
  return (
    <div className="flex sm:gap-1">
      {[...Array(5)].map((_, index: number) => {
        const value = index + 1;

        if (starRating >= value) {
          return <TbStarFilled key={index} className="text-yellow-400" />;
        } else if (starRating >= value - 0.5) {
          return <TbStarHalfFilled key={index} className="text-yellow-400" />;
        } else {
          return <TbStar key={index} />;
        }
      })}
    </div>
  );
};

export default ReviewStarRating;
