"use client";
import { cn, formatDate } from "@/lib/utils";
import Image from "next/image";
import { Button, Chip, Image as HeroImage } from "@heroui/react";
import { Heart } from "lucide-react";
import { Movie } from "@/types/movie";
import TVSeries from "@/types/tv";
import { getImageUrl } from "@/lib/api/tmdb";
import { CiBookmarkPlus } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { BsBack, BsSend } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const MediaHeader = ({ media }: { media: Movie | TVSeries }) => {
  const router = useRouter();
  const backdropUrl = getImageUrl(media.backdrop_path);
  const posterUrl = getImageUrl(media.poster_path, "500");
  console.log("Details:", media);

  const title = "title" in media ? media.title : media.name;
  const releaseDate =
    "release_date" in media ? media.release_date : media.first_air_date;
  return (
    <>
      <div
        className={cn(
          `w-full h-[280px] sm:h-[300px] bg-slate-800 bg-cover bg-center relative`
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-b z-1  from-black/80 via-transparent to-transparent" />
        <div className="absolute top-0 w-full z-2 p-3 flex justify-between">
          <Button
            isIconOnly
            variant="light"
            size="sm"
            radius="lg"
            onPress={() => router.back()}
          >
            <IoMdArrowRoundBack size={18} />
          </Button>
          {/* <Button isIconOnly variant="light" size="sm">
            <BsBack />
          </Button> */}
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
          <div className="flex gap-2">
            <Button isIconOnly variant="light">
              <CiBookmarkPlus size={28} />
            </Button>
            <Button isIconOnly variant="light">
              <BsSend size={23} />
            </Button>
          </div>
        </div>
        {/* Metadata */}
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

        <div className="flex gap-2 py-2">
          <Button fullWidth color="primary">
            Play Trivia
          </Button>
          <Button
            fullWidth
            variant="ghost"
            className="border-pink-500 text-pink-500 border-1"
          >
            Favourite
          </Button>
        </div>

        <p className="text-sm font-extralight text-foreground/75">
          {media.overview}
        </p>
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
            <p className="text-foreground/50 text-sm">{media.overview}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaHeader;
