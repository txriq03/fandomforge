import useIsMobile from "@/hooks/useIsMobile";
import React, { useState } from "react";
import { TbStar, TbStarFilled, TbStarHalfFilled } from "react-icons/tb";

type Rating = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface StarRatingProps {
  rating?: Rating;
  onChange?: (value: Rating) => void;
}

const StarRating = ({ rating = 0 as Rating, onChange }: StarRatingProps) => {
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
              <TbStarFilled size={28} className="text-yellow-400" />
            ) : starType === "half" ? (
              <TbStarHalfFilled size={28} className="text-yellow-400" />
            ) : (
              <TbStar size={28} />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
