"use client";
import { useBookmarks } from "@/hooks/useBookmarks";
import { fetchMedia, getImageUrl } from "@/lib/api/tmdb";
import { useUser } from "@/providers/UserProvider";

import { useQueries } from "@tanstack/react-query";
import MediaPoster from "./MediaPoster";
import { Alert } from "@heroui/alert";
import { Spinner } from "@heroui/spinner";
import SkeletonCard from "./SkeletonCard";

const BookmarksGrid = () => {
  const user = useUser();

  if (!user)
    return (
      <Alert
        title="No user found"
        description="You need to be logged in to view saved media."
        color="warning"
        variant="faded"
      />
    );

  const { data: bookmarks, isPending } = useBookmarks(user.id);

  const mediaQueries = useQueries({
    queries: (bookmarks ?? []).map(({ media_id, media_type }) => ({
      queryKey: ["bookmarkDetails", media_type, media_id],
      queryFn: () => fetchMedia(media_id, media_type),
      enabled: !!bookmarks,
      staleTime: 1000 * 60 * 60,
    })),
  });

  if (isPending || !bookmarks)
    return (
      <div className="flex gap-2 lg:gap-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard className="hidden sm:flex" />
        <SkeletonCard className="hidden md:flex" />
        <SkeletonCard className="hidden lg:flex" />
      </div>
    );

  console.log("Media queries:", mediaQueries);
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-3">
      {mediaQueries.map((query, index) => {
        const poster = getImageUrl(query.data?.poster_path);
        const { media_id, media_type } = bookmarks[index];

        // Add media_type to json object
        const media = { ...query.data, media_type: media_type };

        if (!poster) return null;

        return (
          <MediaPoster key={media_id} media={media} mediaType={media_type} />
        );
      })}
    </div>
  );
};

export default BookmarksGrid;
