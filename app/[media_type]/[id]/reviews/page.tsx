import ReviewMessageBox from "@/Components/media-page/ReviewMessageBox";
import Reviews from "@/Components/media-page/Reviews";
import Padding from "@/Components/ui/Padding";
import React from "react";

const ReviewsPage = () => {
  return (
    <Padding className="pt-2 pb-20">
      <ReviewMessageBox />
      <Reviews />
    </Padding>
  );
};

export default ReviewsPage;
