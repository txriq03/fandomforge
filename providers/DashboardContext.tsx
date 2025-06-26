"use client";

import { getPopularMovies } from "@/lib/api/tmdb";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useState } from "react";

interface DashboardContextType {
  popularMovies: any;
  isPending: boolean;
  error: any;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const useDashbaord = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider.");
  }
  return context;
};

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: popularMovies,
    isPending,
    error,
  } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: getPopularMovies,
  });

  return (
    <DashboardContext.Provider value={{ popularMovies, isPending, error }}>
      {children}
    </DashboardContext.Provider>
  );
};
