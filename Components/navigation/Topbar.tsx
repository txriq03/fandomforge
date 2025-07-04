"use client";
import SearchBox from "../SearchBox";
import { Button } from "@heroui/react";
import { Bell, LogIn, LogOut } from "lucide-react";
import { useUIContext } from "@/providers/UIContext";
import UserBtn from "../UserBtn";
import { useQuery } from "@tanstack/react-query";
import { devLog } from "@/lib/utils";
import { getProfile } from "@/lib/supabase/client-actions";

const Topbar = ({ user }: any) => {
  const { onLoginOpen } = useUIContext();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  devLog.log("Profile", profile);
  devLog.log("User", user);

  return (
    <div className=" w-full sm:px-2 lg:px-4  sm:pt-2">
      <div className="bg-sidebar py-2 px-2 sm:rounded-xl flex justify-between gap-4 outline-1 outline-indigo-500/15">
        <SearchBox />
        <div className="flex gap-2">
          {!user ? (
            <Button variant="shadow" color="primary" onPress={onLoginOpen}>
              Login <LogIn />
            </Button>
          ) : (
            <>{profile && <UserBtn profile={profile} />}</>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
