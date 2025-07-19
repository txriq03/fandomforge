import { Movie } from "@/types/movie";
import { MediaType } from "@/types/trending";
import TVSeries from "@/types/tv";

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
  console.log("Logo data:", data);
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
