"use client";
import { imageBaseUrl } from "@/lib/constants";
import { useDashbaord } from "@/providers/DashboardContext";
import { Image, Spinner } from "@heroui/react";

const MovieGrid = () => {
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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3 md:gap-4">
      {popularMovies.results.map((movie: any) => {
        const url = `${imageBaseUrl}${movie.poster_path}`;
        return (
          <div key={movie.id}>
            <Image
              src={url}
              className="w-full h-full object-cover hover:scale-105"
            />
          </div>
        );
      })}
    </div>
  );
};

export default MovieGrid;
