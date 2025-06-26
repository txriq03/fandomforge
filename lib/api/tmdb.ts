export const getPopularMovies = async () => {
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
