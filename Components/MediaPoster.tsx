"use client";
import { imageBaseUrl } from "@/lib/constants";
import { Button, Chip } from "@heroui/react";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import React from "react";
import { cn, formatNumber } from "@/lib/utils";
import { TrendingMedia } from "@/types/trending";

interface Props {
  media: TrendingMedia;
  className?: string;
  number?: number;
}

const MediaPoster = ({ media, className, number }: Props) => {
  const url = `${imageBaseUrl}${media.poster_path}`;
  let name;
  if (media.media_type === "movie") {
    name = media.title;
  } else {
    name = media.name;
  }
  return (
    <Link
      href={`/${media.media_type}/${media.id}`}
      key={media.id}
      className={cn(
        "group relative transition-all duration-300 hover:scale-105 outline-3 outline-transparent group-hover:outline-amber-400",
        className
      )}
    >
      <img
        alt={name}
        src={url}
        className="w-full rounded-lg h-full object-cover transition-[filter] duration-300 group-hover:brightness-50 "
      />
      {number && (
        <div className="top-0 left-0 h-8 w-8 absolute z-20 bg-white grid place-items-center font-bold font-heading rounded-br-sm ">
          {formatNumber(number + 1)}
        </div>
      )}

      <div
        className={cn(
          "flex flex-col justify-between h-full tracking-tighter leading-tighter  absolute top-0 left-0 p-3 text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300",
          number ? "justify-end" : "justify-between"
        )}
      >
        {!number && (
          <Chip
            size="sm"
            className="bg-primary-light flex flex-nowrap"
            radius="sm"
            startContent={<FaStar className="text-amber-300" />}
          >
            {media.vote_average.toFixed(1)}
          </Chip>
        )}

        <div>
          <p className="font-heading  font-bold line-clamp-2">{name}</p>
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
