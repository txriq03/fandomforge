export interface TrendingAllResponse {
  page: number;
  results: (TrendingMovie | TrendingTV | TrendingPerson)[];
  total_pages: number;
  total_results: number;
}

export type MediaType = "movie" | "tv" | "person";

export interface TrendingMovie {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  media_type: "movie";
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TrendingTV {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  media_type: "tv";
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  origin_country: string[];
  vote_average: number;
  vote_count: number;
}

export interface TrendingPerson {
  id: number;
  name: string;
  media_type: "person";
  popularity: number;
  gender: number;
  adult: boolean;
  known_for_department: string;
  profile_path: string | null;
  known_for: (TrendingMovie | TrendingTV)[];
}

// Shared type
export type TrendingMedia = TrendingMovie | TrendingTV;
