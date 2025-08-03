// context/SearchContext.tsx
"use client";

import React, { createContext, useContext } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchAndDiscovery } from "@/hooks/useSearchAndDiscovery";
import { MediaType } from "@/types/trending";
import { useSearchParams } from "next/navigation";

type SearchContextType = {
  query: string;
  genres: string;
  year: string;
  data: {
    searchResults: any[];
    filteredResults: any[];
  };
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
  const genres = searchParams.get("genres") || "";
  const year = searchParams.get("year") || "";

  const debouncedQuery = useDebounce(query, 300);

  const { data, isPending, isFetching } = useSearchAndDiscovery(
    debouncedQuery,
    mediaType,
    genres,
    year
  );

  return (
    <SearchContext.Provider 
      value={{ 
        query, 
        genres, 
        year, 
        data: data || { searchResults: [], filteredResults: [] }, 
        isPending, 
        isFetching 
      }}
    >
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