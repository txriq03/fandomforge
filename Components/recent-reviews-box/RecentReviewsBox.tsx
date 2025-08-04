import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
}
const RecentReviewsBox = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "p-2 rounded-xl bg-primary/1 border-1 border-primary/25 flex flex-col",
        className
      )}
    >
      <h3 className="text-primary-light">Recent Reviews</h3>
      <div className="flex-1 grid place-items-center">
        <p className="text-lg text-slate-500/75 font-semibold">
          In Development
        </p>
      </div>
    </div>
  );
};

export default RecentReviewsBox;
