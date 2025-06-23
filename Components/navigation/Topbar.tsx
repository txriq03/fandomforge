"use client";
import React from "react";
import SearchBox from "../SearchBox";
import { Button } from "@heroui/react";
import { Bell, LogIn, Settings } from "lucide-react";

const Topbar = () => {
  return (
    <div className=" w-full ">
      <div className="bg-sidebar py-2 px-2 rounded-xl flex justify-between gap-4">
        <SearchBox />
        <div className="flex gap-2">
          <Button
            isIconOnly
            radius="full"
            className="p-2.5 text-primary hidden"
            color="primary"
            variant="flat"
          >
            <Settings />
          </Button>
          <Button variant="shadow" color="primary">
            Login <LogIn />
          </Button>
          <Button
            isIconOnly
            radius="full"
            className="p-2.5 text-primary hidden"
            color="primary"
            variant="flat"
          >
            <Bell />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
