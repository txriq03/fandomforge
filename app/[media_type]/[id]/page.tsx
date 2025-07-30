import CastSection from "@/Components/media-page/CastSection";
import Overview from "@/Components/media-page/Overview";
import Padding from "@/Components/ui/Padding";
import React from "react";

const MoviePage = () => {
  return (
    <Padding className="pt-2">
      {/* <Overview /> */}
      <CastSection />
    </Padding>
  );
};

export default MoviePage;
