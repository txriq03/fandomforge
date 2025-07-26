// context/SearchContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearch } from "@/hooks/useSearch";
import { MediaType } from "@/types/trending";
import { SearchMovieResponse, SearchTVResponse } from "@/types/tmdb";
import { useSearchParams } from "next/navigation";

type SearchContextType = {
  query: string;
  data: SearchMovieResponse | SearchTVResponse;
  isPending: boolean;
  isFetching: boolean;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({
  children,
  mediaType = "movie",
}: {
  children: React.ReactNode;
  mediaType?: MediaType;
}) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const debouncedQuery = useDebounce(query, 300);

  const { data, isPending, isFetching } = useSearch(debouncedQuery, mediaType);

  return (
    <SearchContext.Provider value={{ query, data, isPending, isFetching }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error("useSearchContext must be used within SearchProvider");
  return context;
};
