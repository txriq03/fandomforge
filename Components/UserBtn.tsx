"use client";

import Profile from "@/types/profile";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { ChevronDown } from "lucide-react";
import AccountMenu from "./AccountMenu";
import Link from "next/link";

const UserBtn = ({ profile }: { profile: Profile }) => {
  return (
    <div className="h-full flex  rounded-full bg-black/5 sm:pr-1 items-center">
      <Link
        href={`/profile/${profile.username}`}
        className="flex gap-2 rounded-full"
      >
        <Avatar showFallback src={"/default_pfp.png"} />
        <div className=" flex-col hidden sm:flex">
          <p className="text-sm">{profile.username}</p>
          <p className="text-[0.8rem] text-black/50">
            Level <span className="font-semibold">{profile.level}</span>
          </p>
        </div>
      </Link>
      <AccountMenu />
    </div>
  );
};

export default UserBtn;
