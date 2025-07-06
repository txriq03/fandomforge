"use client";
import { imageBaseUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useDashbaord } from "@/providers/DashboardContext";
import { Image, Spinner } from "@heroui/react";
import Link from "next/link";
import MediaPoster from "./MediaPoster";

const MovieGrid = ({ className }: { className?: string }) => {
  const { popularMovies, isPending, error } = useDashbaord();

  console.log(popularMovies);

  if (isPending)
    return (
      <div className="text-center ">
        <Spinner variant="simple" size="lg" />
      </div>
    );
  if (error)
    return (
      <div className="text-center py-4 text-rose-500">
        Error fetching movies
      </div>
    );

  return (
    <div
      className={cn(
        "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 sm:gap-3 md:gap-3",
        className
      )}
    >
      {popularMovies.results.map((movie: any) => {
        const url = `${imageBaseUrl}${movie.poster_path}`;
        return <MediaPoster media={movie} key={movie.id} />;
      })}
    </div>
  );
};

export default MovieGrid;
