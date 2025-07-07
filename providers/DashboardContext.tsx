"use client";

import { getTrending } from "@/lib/api/tmdb";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";

interface DashboardContextType {
  trending: any;
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
    data: trending,
    isPending,
    error,
  } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: getTrending,
  });

  return (
    <DashboardContext.Provider value={{ trending, isPending, error }}>
      {children}
    </DashboardContext.Provider>
  );
};
