"use client";
import { useQuery } from "@tanstack/react-query";
import { imageBaseUrl } from "@/utils/constants";
import SteamCard from "./SteamCard";
const getPopularMovies = async () => {
  const url =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
    },
  };
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }
  return res.json();
};

const MovieGrid = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["movies"],
    queryFn: getPopularMovies,
  });

  console.log(data);

  if (isPending) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-4 text-rose-500">
        Error fetching movies
      </div>
    );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {data.results.map((movie: any) => (
        <div key={movie.id} className="flex flex-col items-center">
          <SteamCard url={`${imageBaseUrl}${movie.poster_path}`} />
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
