import { cn, getImageUrl } from "@/lib/utils";
import { Movie } from "@/types/movie";
import React from "react";

const MediaHeader = ({ movie }: { movie: Movie }) => {
  const imageUrl = getImageUrl(movie.backdrop_path);
  console.log(imageUrl);
  return (
    <div
      className={cn(
        `w-full h-[250px] bg-slate-800 bg-cover bg-center relative`
      )}
    >
      <img
        src={imageUrl}
        className="h-full w-full object-cover object-center"
      />
    </div>
  );
};

export default MediaHeader;
