"use client";

import { Avatar, Button } from "@heroui/react";
import { ChevronDown } from "lucide-react";

const UserBtn = ({ profile }: any) => {
  return (
    <div className="h-full flex gap-2 rounded-full bg-black/5 sm:pr-1 items-center">
      <Avatar showFallback src={"/default_pfp.png"} />
      <div className=" flex-col hidden sm:flex">
        <p className="text-sm">{profile.username}</p>
        <p className="text-[0.8rem] text-black/50">
          Level <span className="font-semibold">1</span>
        </p>
      </div>
      <Button
        isIconOnly
        size="sm"
        radius="full"
        variant="light"
        className="hidden sm:flex"
      >
        <ChevronDown size={21} className="text-slate-900/50" />
      </Button>
    </div>
  );
};

export default UserBtn;
