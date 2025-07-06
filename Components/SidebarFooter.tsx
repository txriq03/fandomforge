"use client";
import { Button } from "@heroui/react";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import AccountBar from "./AccountBar";

const SidebarFooter = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("flex rounded-xl  sm:pr-1 items-center gap-1", className)}
    >
      <AccountBar />
      <Button
        isIconOnly
        variant="solid"
        radius="md"
        color="primary"
        className=" hidden group-data-[state=open]/sidebar:flex"
      >
        <Bell size={21} />
      </Button>
    </div>
  );
};

export default SidebarFooter;
