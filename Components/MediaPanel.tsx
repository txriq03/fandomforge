"use client";
import { imageBaseUrl } from "@/lib/constants";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import React from "react";
import { cn, formatNumber } from "@/lib/utils";
import { MediaType, TrendingMedia } from "@/types/trending";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import NextImage from "next/image";
import { DiscoverMovie, DiscoverTVSeries, Movie } from "@/types/movie";
import TVSeries from "@/types/tv";
import BookmarkButton from "./ui/BookmarkButton";

interface Props {
  media: Movie | TVSeries | DiscoverMovie | DiscoverTVSeries;
  className?: string;
  number?: number;
  mediaType: MediaType;
}

const MediaPanel = ({ media, className, number, mediaType }: Props) => {
  const posterUrl = `${imageBaseUrl}${media.poster_path}`;
  const backdropUrl = `${imageBaseUrl}${media.backdrop_path}`;

  let name: string;

  if (mediaType === "movie") {
    name = (media as Movie | DiscoverMovie).title;
  } else {
    name = (media as TVSeries | DiscoverTVSeries).name;
  }

  return (
    <article
      className={cn(
        "relative rounded-md  overflow-hidden flex h-[25vw] max-h-50 ",
        className,
      )}
    >
      <Link
        href={`/${mediaType}/${media.id}`}
        className="absolute inset-0 z-1"
      />

      <div className="relative flex w-full h-full">
        <Image
          alt={name}
          src={posterUrl}
          radius="none"
          classNames={{
            wrapper: "object-cover aspect-2/3 z-0",
          }}
        />
        <div className="relative w-full h-full">
          {/* Dark backdrop */}
          <Image
            alt={name}
            src={backdropUrl}
            radius="none"
            classNames={{
              wrapper: "object-cover absolute brightness-15 inset-0 ",
            }}
          />

          {/* Content */}
          <div className="py-2 px-3 min-[480px]:py-3 absolute inset-0 flex flex-col gap-1">
            <h2 className="text-sm min-[480px]:text-[1rem] line-clamp-1">
              {name}
            </h2>
            <p className="line-clamp-1 text-foreground/50 text-[0.8rem]">
              {media.overview}
            </p>

            <div
              className="mt-auto self-end z-2"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <BookmarkButton
                mediaId={media.id}
                mediaType={mediaType}
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MediaPanel;
