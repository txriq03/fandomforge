"use client";

import { useCredits } from "@/hooks/useCredits";
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

  console.log("Credits:", credits);

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
    <div className="space-y-2 py-2">
      <h2 className="text-base xl:text-3xl font-heading text-primary-light font-semibold">
        Actors
      </h2>

      <ActorGrid cast={credits.cast} />

      <p></p>
    </div>
  );
};

const ActorGrid = ({ cast }: { cast: CastMember[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {cast.map((actor: CastMember) => {
        if (!actor.profile_path) return null;
        return (
          <div className="flex gap-3 bg-primary/5 rounded-xl h-[150px]">
            <Image
              src={getImageUrl(actor.profile_path)}
              className="object-cover flex-shrink-0 min-w-[100px]"
              height="auto"
              width={100}
            />
            <div className="py-2">
              <p className="text-2xl">{actor.name}</p>
              <p className="text-foreground/75">{actor.character}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CastSection;
