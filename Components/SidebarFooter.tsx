"use client";
import { Button } from "@heroui/react";
import { cn } from "@/lib/utils";
import { RiSettings3Fill } from "react-icons/ri";
import AccountBar from "./AccountBar";
import { FaBell } from "react-icons/fa";

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
          color="primary"
          size="sm"
          className=" hidden group-data-[state=open]/sidebar:flex"
        >
          <RiSettings3Fill className="text-primary-light" size={21} />
        </Button>
        <Button
          isIconOnly
          variant="light"
          radius="md"
          color="primary"
          size="sm"
          className=" hidden group-data-[state=open]/sidebar:flex"
        >
          <FaBell className="text-primary-light" size={21} />
        </Button>
      </div>
    </div>
  );
};

export default SidebarFooter;
