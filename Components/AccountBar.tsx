"use client";
import { getProfile } from "@/lib/supabase/client-actions";
import { Avatar, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import AccountCard from "./AccountCard";

const AccountBar = () => {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  if (!profile) {
    return;
  }
  return (
    <Popover showArrow>
      <PopoverTrigger>
        <div className="flex flex-nowrap gap-2 rounded-md flex-1 hover:bg-black/5 transition-all duration-250 cursor-pointer">
          <Avatar radius="md" showFallback src={"/default_pfp.png"} />
          <div className=" flex-col flex-nowrap hidden group-data-[state=open]/sidebar:sm:flex">
            <p className="text-sm">{profile.username}</p>
            <p className="text-[0.8rem] text-black/50 whitespace-nowrap">
              Level <span className="font-semibold">{profile.level}</span>
            </p>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <AccountCard profile={profile} />
      </PopoverContent>
    </Popover>
  );
};

export default AccountBar;
