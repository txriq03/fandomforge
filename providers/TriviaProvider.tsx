// providers/TriviaProvider.tsx
"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { triviaKey } from "@/hooks/useGenerateTrivia";
import { generateTrivia, type Payload } from "@/lib/api/openai";
import { Movie } from "@/types/movie";
import TVSeries from "@/types/tv";

type TriviaCtx = {
  activeTriviaMedia: Movie | TVSeries | null;
  setActiveTriviaMedia: Dispatch<SetStateAction<Movie | TVSeries | null>>;
  /** Fire the query and cache the result (returns data) */
  generate: (payload: Payload) => Promise<unknown>;
  /** Prefetch in the background (no UI wait) */
  prefetch: (payload: Payload) => Promise<void>;
  /** Read from cache only (no network) */
  getFromCache: (payload: Payload) => unknown | undefined;
  /** Remove a specific cached result */
  clear: (payload: Payload) => void;
  /** Global fetching state for any trivia */
  isFetchingAny: boolean;
  /** Per-payload fetching state */
  isFetching: (payload: Payload) => boolean;
  /** Optional: remember the “active” payload */
  setActive: (payload: Payload | undefined) => void;
  getActive: () => Payload | undefined;
};

const TriviaContext = createContext<TriviaCtx | null>(null);

export function TriviaProvider({ children }: { children: React.ReactNode }) {
  const qc = useQueryClient();
  const activeRef = useRef<Payload | undefined>(undefined);

  const isFetchingAny = useIsFetching({ queryKey: ["generate-trivia"] }) > 0;
  const [activeTriviaMedia, setActiveTriviaMedia] = useState<
    Movie | TVSeries | null
  >(null);

  const value = useMemo<TriviaCtx>(() => {
    const generate = async (payload: Payload) => {
      // fetchQuery will hit cache if fresh; otherwise it requests and caches
      return qc.fetchQuery({
        queryKey: triviaKey(payload),
        queryFn: () => generateTrivia(payload),
        staleTime: 1000 * 60 * 60,
      });
    };

    const prefetch = async (payload: Payload) => {
      await qc.prefetchQuery({
        queryKey: triviaKey(payload),
        queryFn: () => generateTrivia(payload),
        staleTime: 1000 * 60 * 60,
      });
    };

    const getFromCache = (payload: Payload) =>
      qc.getQueryData(triviaKey(payload));

    const clear = (payload: Payload) => {
      qc.removeQueries({ queryKey: triviaKey(payload) });
    };

    const isFetching = (payload: Payload) =>
      useIsFetching({ queryKey: triviaKey(payload) }) > 0;

    const setActive = (payload: Payload | undefined) => {
      activeRef.current = payload;
    };
    const getActive = () => activeRef.current;

    return {
      activeTriviaMedia,
      setActiveTriviaMedia,
      generate,
      prefetch,
      getFromCache,
      clear,
      isFetchingAny,
      isFetching,
      setActive,
      getActive,
    };
  }, [qc, isFetchingAny, activeTriviaMedia]);

  return (
    <TriviaContext.Provider value={value}>{children}</TriviaContext.Provider>
  );
}

export function useTrivia() {
  const ctx = useContext(TriviaContext);
  if (!ctx) throw new Error("useTrivia must be used within <TriviaProvider>");
  return ctx;
}
