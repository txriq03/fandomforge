"use client";
import { cn, getImageUrl } from "@/lib/utils";
import { Movie } from "@/types/movie";
import Image from "next/image";
import { Button, Image as HeroImage } from "@heroui/react";
import { Heart } from "lucide-react";

const MediaHeader = ({ movie }: { movie: Movie }) => {
  const backdropUrl = getImageUrl(movie.backdrop_path);
  const posterUrl = getImageUrl(movie.poster_path, "500");
  console.log(backdropUrl);
  return (
    <>
      <div
        className={cn(
          `w-full h-[180px] sm:h-[300px] bg-slate-800 bg-cover bg-center relative`
        )}
      >
        <Image
          alt={movie.title}
          fill
          src={backdropUrl}
          className="object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      <div className="bg-slate-50 w-full  px-5 sm:px-10">
        <div className="flex gap-10">
          {/* Poster and buttons */}
          <div className="flex  sm:flex-col gap-2 py-5 w-full sm:w-[180px] lg:w-[250px]  flex-shrink-0 -mt-30 items-end sm:items-stretch">
            <HeroImage
              src={posterUrl}
              className="object-cover h-auto w-[100px] sm:w-full"
              radius="sm"
              shadow="lg"
            />
            <div className="flex flex-1 gap-2">
              <Button fullWidth color="primary" size="sm">
                Play
              </Button>
              <Button isIconOnly className="bg-pink-500 text-white" size="sm">
                <Heart size={18} />
              </Button>
            </div>
          </div>

          <div className="max-sm:hidden flex flex-col gap-1 py-2">
            <p className="text-xl sm:text-[1.8rem]">{movie.title}</p>
            <p className="text-foreground/50 text-sm">{movie.overview}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaHeader;
