"use client";
import { cn } from "@/lib/utils";
import { RiSettings3Fill } from "react-icons/ri";
import AccountBar from "./AccountBar";
import { FaBell } from "react-icons/fa";
import { Button } from "@heroui/button";
import NotificationsPopover from "./notifications/NotificationsPopover";

const SidebarFooter = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("flex rounded-xl sm:pr-1 items-center gap-2", className)}
    >
      <AccountBar />
      <div className="flex gap-1">
        <Button
          isIconOnly
          variant="light"
          radius="md"
          size="sm"
          className=" hidden group-data-[state=open]/sidebar:flex"
        >
          <RiSettings3Fill className="text-foreground/75" size={21} />
        </Button>
        <NotificationsPopover />
      </div>
    </div>
  );
};

export default SidebarFooter;
