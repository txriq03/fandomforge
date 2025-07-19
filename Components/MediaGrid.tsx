"use client";
import { cn, devLog } from "@/lib/utils";
import MediaPoster from "./MediaPoster";
import { useQuery } from "@tanstack/react-query";
import { getTrending } from "@/lib/api/tmdb";
import { Card } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

const MediaGrid = ({ className }: { className?: string }) => {
  const {
    data: trending,
    isPending,
    error,
  } = useQuery({
    queryKey: ["trendingMedia"],
    queryFn: getTrending,
  });

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
      {trending.results.map((media: any) => {
        return (
          <MediaPoster
            media={media}
            key={media.id}
            className="hover:scale-105"
          />
        );
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
export default MediaGrid;
