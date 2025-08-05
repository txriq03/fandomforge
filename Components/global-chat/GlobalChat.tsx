"use client";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { TbMessage } from "react-icons/tb";
import { useUser } from "@/providers/UserProvider";
import NoAuthBox from "./NoAuthBox";
import MessageBox from "./MessageBox";
import UserMessages from "./UserMessages";

interface Props {
  className?: string;
}

const GlobalChat = ({ className }: Props) => {
  const user = useUser();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "p-2 rounded-xl bg-primary/1 border-1 border-primary/25 flex-1 flex overflow-hidden ",
        className
      )}
    >
      <div className="flex flex-col justify-between flex-1">
        {/* Header */}
        <div className="text-primary-light flex gap-2 items-center px-1">
          <TbMessage />
          <p>Global Chat</p>
        </div>

        {/* User Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <UserMessages scrollRef={scrollRef} />
        </div>

        {/* Footer */}
        <div className="p-2">{user ? <MessageBox /> : <NoAuthBox />}</div>
      </div>
    </div>
  );
};

export default GlobalChat;
