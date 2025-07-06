import { imageBaseUrl } from "@/lib/constants";
import { Button, Chip, Image } from "@heroui/react";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import React from "react";

const MediaPoster = ({ media }: any) => {
  const url = `${imageBaseUrl}${media.poster_path}`;

  return (
    <Link
      href={`/movie/${media.id}`}
      key={media.id}
      className="group relative transition-all duration-300  hover:scale-105"
    >
      <Image
        alt={media.id}
        src={url}
        className="w-full h-full object-cover transition-filter duration-300 group-hover:brightness-50"
      />
      <div className="flex flex-col justify-between h-full tracking-tighter leading-tighter  absolute z-50 top-0 left-0 p-3 text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <Chip
          size="sm"
          className="bg-primary-light flex flex-nowrap"
          radius="sm"
          startContent={<FaStar className="text-amber-300" />}
        >
          {media.vote_average.toFixed(1)}
        </Chip>
        <div>
          <p className="font-heading  font-bold line-clamp-2">{media.title}</p>
          <p className="text-[0.8rem] tracking-tighter leading-tighter text-neutral-200 line-clamp-2">
            {media.overview}
          </p>
          <Button
            color="primary"
            size="sm"
            className="mt-2 tracking-widest"
            fullWidth
          >
            PLAY
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default MediaPoster;
