const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
  },
};

export const getPopularMovies = async () => {
  const url =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }
  return res.json();
};

export const getTrending = async () => {
  const url = "https://api.themoviedb.org/3/trending/all/day?language=en-US";
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Failed to fetch trending.");
  }
  return res.json();
};

export const getMovieById = async (movieId: string) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Failed to fetch movie details.");
  }
  return res.json();
};
