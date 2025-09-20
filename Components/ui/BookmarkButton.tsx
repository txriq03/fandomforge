"use client";
import { addToast } from "@heroui/toast";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { TbBookmark, TbBookmarkFilled } from "react-icons/tb";
import { useState } from "react";
import { useUser } from "@/providers/UserProvider";
import { useIsBookmarked } from "@/hooks/useIsBookmarked";
import { addBookmark, removeBookmark } from "@/lib/supabase/utils";
import { MediaType } from "@/types/trending";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@heroui/theme";

interface Props {
  mediaId: number;
  mediaType: MediaType;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const BookmarkButton = ({
  mediaId,
  mediaType,
  size = "md",
  className,
}: Props) => {
  const [isBookmarkPending, setIsBookmarkPending] = useState(false);
  const user = useUser();
  const queryClient = useQueryClient();

  const { data: isBookmarked, isPending: isBookmarkedPending } =
    useIsBookmarked({
      media_id: mediaId,
      media_type: mediaType,
      user_id: user?.id ?? "",
    });

  const handleBookmark = async () => {
    if (!user) return;

    const bookmarkPayload = {
      media_id: mediaId,
      media_type: mediaType,
      user_id: user.id,
    };
    setIsBookmarkPending(true);
    try {
      if (isBookmarked) {
        await removeBookmark(bookmarkPayload);

        addToast({
          title: "Removed from bookmarks",
          color: "success",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
      } else {
        await addBookmark(bookmarkPayload);

        addToast({
          title: "Added to bookmarks",
          color: "success",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
      }

      // Invalidate the query so it refetches and updates the UI
      queryClient.invalidateQueries({
        queryKey: ["isBookmarked", user.id, mediaId, mediaType],
      });
    } catch (err) {
      addToast({
        title: "Bookmark failed",
        description: (err as Error).message,
        color: "danger",
      });
    } finally {
      setIsBookmarkPending(false);
    }
  };

  return (
    <Button
      isIconOnly
      variant="light"
      onPress={handleBookmark}
      size={size}
      className={cn(className)}
    >
      {isBookmarkPending ? (
        <Spinner
          size="sm"
          variant="simple"
          classNames={{
            circle1: "text-white",
            circle2: "text-slate-300",
          }}
        />
      ) : isBookmarked ? (
        <TbBookmarkFilled size={24} />
      ) : (
        <TbBookmark size={24} />
      )}
    </Button>
  );
};

export default BookmarkButton;
