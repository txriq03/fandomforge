"use client";

import { Movie } from "@/types/movie";
import TVSeries from "@/types/tv";
import { createContext, useContext } from "react";

export const MediaContext = createContext<any>(null);
export const useMedia = () => useContext(MediaContext);

export default function MediaProvider({
  children,
  media,
}: {
  children: React.ReactNode;
  media: Movie | TVSeries;
}) {
  return (
    <MediaContext.Provider value={media}>{children}</MediaContext.Provider>
  );
}
