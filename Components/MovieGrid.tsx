"use client";
import { cn, devLog } from "@/lib/utils";
import { useDashbaord } from "@/providers/DashboardContext";
import { Card, Skeleton } from "@heroui/react";
import MediaPoster from "./MediaPoster";

const MovieGrid = ({ className }: { className?: string }) => {
  const { popularMovies, isPending, error } = useDashbaord();
  devLog.log(popularMovies);

  if (isPending)
    return (
      <div
        className={cn(
          "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-3 ",
          className
        )}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  if (error)
    return (
      <div className="text-center py-4 text-rose-500">
        Error fetching movies
      </div>
    );

  return (
    <div
      className={cn(
        "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 sm:gap-3 md:gap-3",
        className
      )}
    >
      {popularMovies.results.map((movie: any) => {
        return <MediaPoster media={movie} key={movie.id} />;
      })}
    </div>
  );
};

const SkeletonCard = () => {
  return (
    <Card className="space-y-3 sm:space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-18 sm:h-24 rounded-lg bg-default-300" />
      </Skeleton>
      <div className=" space-y-2 sm:space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </Card>
  );
};
export default MovieGrid;
