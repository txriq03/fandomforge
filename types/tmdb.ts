export type Genre = {
  id: number;
  name: string;
};

export type SearchMovieResponse = {
  page: number;
  results: SearchMovieResult[];
  total_pages: number;
  total_results: number;
};

export type SearchMovieResult = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type SearchTVResponse = {
  page: number;
  results: SearchTVResult[];
  total_pages: number;
  total_results: number;
};

export type SearchTVResult = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
};
