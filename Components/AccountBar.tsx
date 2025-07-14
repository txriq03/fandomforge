"use client";
import { getOwnProfile } from "@/lib/supabase/utils";
import {
  Avatar,
  Badge,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import AccountCard from "./AccountCard";

const AccountBar = () => {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getOwnProfile,
  });

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  if (!profile) {
    return;
  }
  return (
    <Popover isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger>
        <div className="flex flex-nowrap gap-2 rounded-md flex-1 hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-250 cursor-pointer">
          <Badge
            color="success"
            content=""
            placement="bottom-right"
            size="lg"
            shape="circle"
            classNames={{
              badge: "bottom-2 right-2 border-sidebar border-3",
            }}
          >
            <Avatar radius="full" showFallback src={"/default_pfp.png"} />
          </Badge>
          <div className=" flex-col flex-nowrap hidden group-data-[state=open]/sidebar:sm:flex">
            <p className="text-sm text-foreground">{profile.username}</p>
            <p className="text-[0.8rem] text-foreground/50 whitespace-nowrap">
              Level <span className="font-semibold">{profile.level}</span>
            </p>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <AccountCard profile={profile} setIsPopoverOpen={setIsPopoverOpen} />
      </PopoverContent>
    </Popover>
  );
};

export default AccountBar;
