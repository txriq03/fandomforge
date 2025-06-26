"use client";
import { imageBaseUrl } from "@/lib/constants";
import SteamCard from "./SteamCard";
import { useDashbaord } from "@/providers/DashboardContext";

const MovieGrid = () => {
  const { popularMovies, isPending, error } = useDashbaord();

  console.log(popularMovies);

  if (isPending) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-4 text-rose-500">
        Error fetching movies
      </div>
    );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {popularMovies.results.map((movie: any) => (
        <div key={movie.id} className="flex flex-col items-center">
          <SteamCard url={`${imageBaseUrl}${movie.poster_path}`} />
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
