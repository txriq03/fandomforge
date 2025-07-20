import ReviewMessageBox from "@/Components/media-page/ReviewMessageBox";
import Reviews from "@/Components/media-page/Reviews";
import Padding from "@/Components/ui/Padding";
import { Divider } from "@heroui/divider";
import React from "react";

const ReviewsPage = () => {
  return (
    <Padding className="pt-2 pb-20">
      <ReviewMessageBox />
      {/* <Divider className="mt-[30px] mb-[15px] bg-primary/25" /> */}
      <p className="pt-10 pb-2 text-sm sm:text-lg text-foreground/60 font-light">
        Reviews
      </p>
      <Reviews />
    </Padding>
  );
};

export default ReviewsPage;
