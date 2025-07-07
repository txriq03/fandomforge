"use client";

import { getProfile } from "@/lib/supabase/client-actions";
import { useUser } from "@/providers/UserProvider";
import { Avatar, Button, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

const InsideBanner = () => {
  const params = useParams();
  const username = params.username as string;
  const { data: profile, isPending } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => getProfile(username),
  });
  const user = useUser();

  const isSameUser = () => {
    return user?.user_metadata.username === profile?.username;
  };

  const isMobile = useMediaQuery("(max-width: 640px)");

  if (isPending) {
    return (
      <Spinner variant="simple" color="danger" className="m-auto" size="lg" />
    );
  }

  return (
    <div className="container w-full  text-white flex justify-between items-end">
      <div className="flex items-end gap-5 ">
        <Avatar
          radius="none"
          src={profile?.profile_pic || "/default_pfp.png"}
          showFallback
          className="w-30 h-30  sm:w-35 sm:h-35"
        />
        <p className="text-lg sm:text-xl my-2">{profile?.username}</p>
      </div>

      {/* Buttons */}
      {!isSameUser() && (
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
