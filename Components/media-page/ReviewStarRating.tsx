import React from "react";
import { TbStar, TbStarFilled } from "react-icons/tb";

const ReviewStarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
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
