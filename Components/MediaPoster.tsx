"use client";
import { imageBaseUrl } from "@/lib/constants";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import React from "react";
import { cn, formatNumber } from "@/lib/utils";
import { MediaType, TrendingMedia } from "@/types/trending";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { DiscoverMovie, DiscoverTVSeries, Movie } from "@/types/movie";
import TVSeries from "@/types/tv";

interface Props {
  media: Movie | TVSeries | DiscoverMovie | DiscoverTVSeries;
  className?: string;
  number?: number;
  mediaType: MediaType;
}

const MediaPoster = ({ media, className, number, mediaType }: Props) => {
  const url = `${imageBaseUrl}${media.poster_path}`;

  let name: string;

  if (mediaType === "movie") {
    name = (media as Movie | DiscoverMovie).title;
  } else {
    name = (media as TVSeries | DiscoverTVSeries).name;
  }

  return (
    <Link
      href={`/${mediaType}/${media.id}`}
      key={media.id}
      className={cn(
        "group relative rounded-md overflow-hidden transition-all duration-300  outline-3 outline-transparent group-hover:outline-amber-400",
        className
      )}
    >
      <Image
        alt={name}
        src={url}
        radius="none"
        classNames={{
          wrapper:
            "w-full h-full object-cover transition-[filter] duration-300 group-hover:brightness-50 ",
        }}
      />
      {number && (
        <div className="top-0 left-0 h-8 w-8 absolute z-20 bg-primary sm:pl-1 max-sm:grid max-sm:place-items-center  font-bold font-heading sm:rounded-br-full text-slate-50">
          <p>{formatNumber(number)}</p>
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
            {media.vote_average?.toFixed(1)}
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
