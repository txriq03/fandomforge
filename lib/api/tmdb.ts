import { MediaType } from "@/types/trending";
import { devLog } from "../utils";
import { MovieCreditsResponse, TmdbReviewsResponse } from "@/types/tmdb";

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

type TrendingType = "all" | "movie" | "tv";
export const getTrending = async (mediaType: TrendingType = "all") => {
  const url = `https://api.themoviedb.org/3/trending/${mediaType}/day?language=en-US`;
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Failed to fetch trending.");
  }

  const data = await res.json();
  const filtered = data.results.filter(
    (item: any) => item.media_type !== "person"
  );
  devLog.log("Filtered: ", filtered);
  return filtered;
};

export const getMediaById = async (mediaId: string, mediaType: MediaType) => {
  const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}?language=en-US`;

  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${mediaType} details.`);
  }
  return res.json();
};

export const fetchMediaLogo = async (
  mediaId: number,
  mediaType: string
): Promise<string> => {
  const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/images?include_image_language=en,`;
  const res = await fetch(url, options);
  const data = await res.json();
  const logo = data.logos?.[0];
  return logo ? `https://image.tmdb.org/t/p/original${logo.file_path}` : "";
};

export const getImageUrl = (
  imageUrl: string | null,
  size = "original"
): string => {
  if (!imageUrl) return "";
  const baseImageUrl =
    size === "original"
      ? `https://image.tmdb.org/t/p/original`
      : `https://image.tmdb.org/t/p/w${size}`;

  return `${baseImageUrl}${imageUrl}`;
};

export async function fetchMedia(mediaId: number, mediaType: MediaType) {
  const TMDB_BASE_URL = "https://api.themoviedb.org/3";
  const url = `${TMDB_BASE_URL}/${mediaType}/${mediaId}`;

  const res = await fetch(url, options);
  if (!res.ok)
    throw new Error(`Failed to fetch ${mediaType} with id ${mediaId}`);

  const data = await res.json();

  return data;
}

export const getMovieGenres = async () => {
  const url = "https://api.themoviedb.org/3/genre/movie/list";
  const res = await fetch(url, options);

  if (!res.ok) throw new Error("Failed to fetch movie genres");
  const data = await res.json();

  return data ?? [];
};

export const getMediaDiscovery = async (
  mediaType: MediaType = "movie",
  genres = "",
  year = ""
) => {
  let url = `https://api.themoviedb.org/3/discover/${mediaType}?include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

  if (genres) {
    url = url + `&with_genres=${genres}`;
  }

  if (year) {
    url = url + `&year=${year}`;
  }

  const res = await fetch(url, options);

  if (!res.ok) throw new Error("Failed to get movie results.");
  const data = await res.json();

  return data ?? [];
};

export const getNowPlaying = async (mediaType: MediaType) => {
  const url = `https://api.themoviedb.org/3/${mediaType}/now_playing`;
  const res = await fetch(url, options);

  if (!res.ok) throw new Error("Failed to get now_playing.");
  const data = await res.json();

  return data ?? [];
};

export const getSearch = async (query: string, mediaType: MediaType) => {
  const url = `https://api.themoviedb.org/3/search/${mediaType}?query=${query}`;

  const res = await fetch(url, options);

  if (!res.ok) throw new Error("Failed to get search results.");
  const data = await res.json();

  return data ?? [];
};

export const getCredits = async (
  mediaId: string,
  mediaType: MediaType
): Promise<MovieCreditsResponse> => {
  const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/credits`;

  const res = await fetch(url, options);

  if (!res.ok) throw new Error("Failed to get credits");

  const data = await res.json();

  return data ?? [];
};

export const getTmdbReviews = async (
  mediaId: string,
  mediaType: MediaType
): Promise<TmdbReviewsResponse> => {
  const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/reviews?language=en-US&page=1`;

  const res = await fetch(url, options);

  if (!res.ok) throw new Error("Failed to get TMDB reviews");

  const data = await res.json();

  return data ?? [];
};
