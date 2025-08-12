"use client";
import useProfile from "@/hooks/useProfile";
import { isSameUser } from "@/lib/supabase/utils";
import { devLog } from "@/lib/utils";
import { useUser } from "@/providers/UserProvider";
import { Profile } from "@/types/tables";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

const InsideBanner = ({ profile }: { profile: Profile }) => {
  const params = useParams();
  const username = params.username as string;
  const user = useUser();
  // const { data: profile, isPending } = useProfile(user!.id);

  const isMobile = useMediaQuery("(max-width: 640px)");

  // if (isPending) {
  //   return (
  //     <Spinner variant="simple" color="danger" className="m-auto" size="lg" />
  //   );
  // }

  return (
    <div className="container w-full  text-white flex justify-between items-end">
      <div className="flex items-end gap-5 ">
        <Avatar
          radius="none"
          src={profile?.avatar_url || "/default_pfp.png"}
          showFallback
          className="w-30 h-30  sm:w-35 sm:h-35"
        />
        <p className="text-lg sm:text-xl my-2">{profile?.username}</p>
      </div>

      {/* Buttons */}
      {!isSameUser(user, profile) && (
        <Button
          startContent={<Plus size={21} />}
          className="my-2 bg-primary-light text-white"
          size={isMobile ? "sm" : "md"}
        >
          Add Friend
        </Button>
      )}
    </div>
  );
};

export default InsideBanner;
