"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { TbMessage } from "react-icons/tb";
import { useUser } from "@/providers/UserProvider";
import { Button } from "@heroui/button";
import { useUIContext } from "@/providers/UIContext";
import useIsMobile from "@/hooks/useIsMobile";
import NoAuthBox from "./NoAuthBox";
import MessageBox from "./MessageBox";

interface Props {
  className?: string;
}

const Chatbox = ({ className }: Props) => {
  const user = useUser();
  const { authModal } = useUIContext();
  const isMobile = useIsMobile();
  return (
    <div
      className={cn(
        "p-2 rounded-xl bg-primary/1 border-1 border-primary/25 flex-1 flex ",
        className
      )}
    >
      <div className="flex flex-col justify-between flex-1">
        <div className="text-primary-light flex gap-2 items-center">
          <TbMessage />
          <p>Global Chat</p>
        </div>

        <div className="p-2">{user ? <MessageBox /> : <NoAuthBox />}</div>
      </div>
    </div>
  );
};

export default Chatbox;
