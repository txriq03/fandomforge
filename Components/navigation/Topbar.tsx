"use client";
import SearchBox from "../SearchBox";
import { Button } from "@heroui/react";
import { Bell, LogIn, LogOut } from "lucide-react";
import { useUIContext } from "@/providers/UIContext";
import UserBtn from "../SidebarFooter";
import { useQuery } from "@tanstack/react-query";
import { devLog } from "@/lib/utils";
import { getProfile } from "@/lib/supabase/client-actions";
import Notifications from "../Notifications";

const Topbar = ({ user }: any) => {
  const { onLoginOpen } = useUIContext();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  devLog.log("Profile", profile);
  devLog.log("User", user);

  return (
    <div className=" w-full  lg:px-4 lg:pt-2">
      <div className="bg-sidebar py-2 px-2 lg:rounded-xl flex justify-between gap-4 outline-1 outline-indigo-500/15">
        <SearchBox />
        <Notifications />
      </div>
    </div>
  );
};

export default Topbar;
