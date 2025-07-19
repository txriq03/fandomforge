"use client";
import { getImageUrl } from "@/lib/api/tmdb";
import { cn } from "@/lib/utils";
import { Movie } from "@/types/movie";
import TVSeries from "@/types/tv";
import { Button } from "@heroui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TbArrowLeft } from "react-icons/tb";

const MediaBanner = ({ media }: { media: Movie | TVSeries }) => {
  const router = useRouter();
  const backdropUrl = getImageUrl(media.backdrop_path);
  const title = "title" in media ? media.title : media.name;
  return (
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
  );
};

export default MediaBanner;
