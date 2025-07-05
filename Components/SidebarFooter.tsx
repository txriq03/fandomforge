"use client";
import { Button } from "@heroui/react";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import AccountBar from "./AccountBar";

const SidebarFooter = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("flex rounded-xl  sm:pr-1 items-center gap-1", className)}
    >
      <AccountBar />
      <Button
        isIconOnly
        variant="light"
        radius="md"
        className="text-black/50 hidden group-data-[state=open]/sidebar:flex"
      >
        <Settings size={21} />
      </Button>
    </div>
  );
};

export default SidebarFooter;
