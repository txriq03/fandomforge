"use client";
import { cn, formatDate } from "@/lib/utils";
import Image from "next/image";
import {
  addToast,
  Button,
  Chip,
  Image as HeroImage,
  Spinner,
} from "@heroui/react";
import { Heart } from "lucide-react";
import { Movie } from "@/types/movie";
import TVSeries from "@/types/tv";
import { getImageUrl } from "@/lib/api/tmdb";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import {
  TbArrowLeft,
  TbBookmark,
  TbBookmarkFilled,
  TbDeviceGamepad3Filled,
  TbHeart,
  TbSend2,
} from "react-icons/tb";
import { useState } from "react";
import { useUser } from "@/providers/UserProvider";
import { useIsBookmarked } from "@/hooks/useIsBookmarked";
import { addBookmark, removeBookmark } from "@/lib/supabase/utils";
import { MediaType } from "@/types/trending";
import { useQueryClient } from "@tanstack/react-query";

const MediaHeader = ({ media }: { media: Movie | TVSeries }) => {
  const user = useUser();
  const [showMore, toggleShowMore] = useState(false);
  const [isBookmarkPending, setIsBookmarkPending] = useState(false);
  const router = useRouter();

  // Set variables
  const backdropUrl = getImageUrl(media.backdrop_path);
  const posterUrl = getImageUrl(media.poster_path, "500");
  const mediaType: MediaType = "title" in media ? "movie" : "tv";

  const queryClient = useQueryClient();

  const { data: isBookmarked, isPending: isBookmarkedPending } =
    useIsBookmarked({
      media_id: media.id,
      media_type: mediaType,
      user_id: user?.id ?? "",
    });

  const handleBookmark = async () => {
    if (!user) return;

    const bookmarkPayload = {
      media_id: media.id,
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

      // ✅ Invalidate the query so it refetches and updates the UI
      queryClient.invalidateQueries({
        queryKey: ["isBookmarked", user.id, media.id, mediaType],
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
  const title = "title" in media ? media.title : media.name;

  return (
    <>
      <div
        className={cn(
          `w-full h-[280px] sm:h-[300px] bg-slate-800 bg-cover bg-center relative`
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-b z-1  from-black/80 via-transparent to-transparent" />
        <div className="absolute top-0 w-full z-2 p-2 flex justify-between">
          <Button
            isIconOnly
            variant="light"
            radius="lg"
            onPress={() => router.back()}
          >
            <TbArrowLeft size={18} />
          </Button>
        </div>
        <Image
          alt={title}
          fill
          src={backdropUrl}
          className="object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* Only show for Mobile */}
      <div className="px-4 py-2 sm:hidden">
        <div className="flex justify-between">
          <h1 className="text-3xl">{title}</h1>

          {/* Buttons */}
          <div className="flex gap-1">
            <Button isIconOnly variant="light" onPress={handleBookmark}>
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
            <Button isIconOnly variant="light">
              <TbSend2 size={24} className="-rotate-45" />
            </Button>
          </div>
        </div>

        <Metadata media={media} />

        {/* Big buttons */}
        <div className="flex gap-2 py-2">
          <Button
            fullWidth
            color="primary"
            startContent={<TbDeviceGamepad3Filled className="shrink-0" />}
          >
            Play Trivia
          </Button>
          <Button
            fullWidth
            variant="ghost"
            className="border-pink-500 text-pink-500 border-1"
            startContent={<TbHeart />}
          >
            Favourite
          </Button>
        </div>

        {/* Description */}
        <div className="text-sm font-extralight text-foreground/75 py-2">
          <p className={showMore ? "" : "line-clamp-3"}>{media.overview}</p>
          <button
            className="text-primary-light font-medium cursor-pointer"
            onClick={() => toggleShowMore(!showMore)}
          >
            {showMore ? "Show less" : "Read more"}
          </button>
        </div>
      </div>

      {/* Show for other devices */}
      <div className="bg-primary/1 w-full  px-5 sm:px-10 max-sm:hidden">
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10">
          {/* Poster and buttons */}
          <div className="flex  sm:flex-col gap-2 py-5 w-full sm:w-[180px] lg:w-[250px]  flex-shrink-0 -mt-30 items-end sm:items-stretch">
            <HeroImage
              src={posterUrl}
              className="object-cover h-auto w-[100px] sm:w-full"
              radius="sm"
              shadow="lg"
            />
            <div className="flex flex-1 gap-2">
              <Button fullWidth color="primary">
                Play
              </Button>
              <Button isIconOnly className="bg-pink-500 text-white">
                <Heart size={18} />
              </Button>
            </div>
          </div>

          <div className=" flex flex-col gap-1 py-2">
            <p className="text-2xl sm:text-[1.8rem] font-heading font-bold">
              {title}
            </p>

            <div className="flex gap-2">
              <Metadata media={media} />
              <div className="flex gap-1">
                <Button isIconOnly variant="light" onPress={handleBookmark}>
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
                <Button isIconOnly variant="light">
                  <TbSend2 size={24} className="-rotate-45" />
                </Button>
              </div>
            </div>

            <p className="text-foreground/50 text-sm">{media.overview}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const Metadata = ({ media }: { media: Movie | TVSeries }) => {
  const releaseDate =
    "release_date" in media ? media.release_date : media.first_air_date;
  return (
    <div className="flex gap-2 py-2 items-center flex-wrap">
      <div className="text-sm flex gap-1 items-center">
        <FaStar className="text-yellow-400" />
        <p>{media.vote_average.toFixed(1)}</p>
      </div>
      <div>•</div>
      <div className="text-sm"> {formatDate(releaseDate, true)}</div>
      <div>•</div>

      {media.genres.map((genre: { id: number; name: string }) => (
        <Chip
          color="primary"
          className="border-1"
          variant="bordered"
          radius="sm"
          size="sm"
          key={genre.id}
        >
          {genre.name}
        </Chip>
      ))}

      {media.adult && (
        <Chip
          color="primary"
          className="border-1"
          variant="bordered"
          radius="sm"
          size="sm"
        >
          18+
        </Chip>
      )}
    </div>
  );
};

export default MediaHeader;
