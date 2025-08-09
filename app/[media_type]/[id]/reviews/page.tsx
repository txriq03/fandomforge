import ReviewMessageBox from "@/Components/media-page/ReviewMessageBox";
import Reviews from "@/Components/media-page/Reviews";
import Padding from "@/Components/ui/Padding";
import React from "react";

const ReviewsPage = () => {
  return (
    <div className="pt-2 pb-20 px-5 lg:px-0">
      <ReviewMessageBox />
      <Reviews />
    </div>
  );
};

export default ReviewsPage;
