"use client";

import { getProfile } from "@/lib/supabase/client-actions";
import { useUser } from "@/providers/UserProvider";
import { Avatar, Button, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

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
          className="w-35 h-35"
        />
        <p className="text-xl my-2">{profile?.username}</p>
      </div>
      {!isSameUser() && (
        <Button className="my-2 bg-primary-light text-white" radius="sm">
          Follow
        </Button>
      )}
    </div>
  );
};

export default InsideBanner;
