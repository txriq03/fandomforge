"use client";

import { useCredits } from "@/hooks/useCredits";
import useIsMobile from "@/hooks/useIsMobile";
import { getImageUrl } from "@/lib/api/tmdb";
import { useMedia } from "@/providers/MediaProvider";
import { CastMember } from "@/types/tmdb";
import { Alert } from "@heroui/alert";
import { Card } from "@heroui/card";
import { Image } from "@heroui/image";
import { Spinner } from "@heroui/spinner";

const CastSection = () => {
  const media = useMedia();
  const {
    data: credits,
    isPending,
    error,
  } = useCredits(media.id, media.media_type);

  if (error)
    return (
      <Alert
        title="Error retrieving credits"
        description={error.message}
        color="danger"
      />
    );

  if (isPending)
    return (
      <Card className="bg-black/5 p-5 grid place-items-center" shadow="none">
        <Spinner variant="simple" />
      </Card>
    );

  return (
    <div className="space-y-2 py-2 px-5 lg:px-0">
      <h2 className="text-base md:text-lg lg:text-xl xl:text-3xl font-heading text-primary-light font-semibold">
        Actors
      </h2>

      <ActorGrid cast={credits.cast} />

      <p></p>
    </div>
  );
};

const ActorGrid = ({ cast }: { cast: CastMember[] }) => {
  const isMobile = useIsMobile();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {cast.map((actor: CastMember) => {
        if (!actor.profile_path) return null;
        return (
          <div
            className="flex gap-3 bg-white/3 rounded-md h-[90px] sm:h-[105px]"
            key={actor.id}
          >
            <Image
              src={getImageUrl(actor.profile_path)}
              className="object-cover flex-shrink-0 min-w-[60px] sm:min-w-[70px]"
              radius="sm"
              height="auto"
              width={isMobile ? 60 : 70}
            />
            <div className="py-2 overflow-hidden">
              <p className="text-sm sm:text-lg lg:text-xl ">{actor.name}</p>
              <p className="text-foreground/75 text-[0.8rem] sm:text-base line-clamp-2">
                {actor.character}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CastSection;
