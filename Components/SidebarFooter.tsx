"use client";
import { Button } from "@heroui/react";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import AccountBar from "./AccountBar";
import { FaBell } from "react-icons/fa";

const SidebarFooter = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("flex rounded-xl sm:pr-1 items-center gap-2", className)}
    >
      <AccountBar />
      <Button
        isIconOnly
        variant="light"
        radius="md"
        color="primary"
        size="sm"
        className=" hidden group-data-[state=open]/sidebar:flex"
      >
        <FaBell size={21} />
      </Button>
    </div>
  );
};

export default SidebarFooter;
