import React from "react";
import { TbStar, TbStarFilled } from "react-icons/tb";

const ReviewStarRating = ({ rating }: { rating: number | null }) => {
  if (!rating) return null;
  return (
    <div className="flex sm:gap-1 ">
      {[...Array(5)].map((_, index: number) => {
        const value = index + 1;
        const isYellow = rating >= value;
        return (
          <div key={value}>
            {isYellow ? (
              <TbStarFilled className="text-yellow-400" />
            ) : (
              <TbStar />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ReviewStarRating;
