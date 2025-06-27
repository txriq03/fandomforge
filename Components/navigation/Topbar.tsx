"use client";
import React, { useContext } from "react";
import SearchBox from "../SearchBox";
import { Button } from "@heroui/react";
import { Bell, LogIn, Settings } from "lucide-react";
import { UIContext, useUIContext } from "@/providers/UIContext";

const Topbar = () => {
  const { isLoginOpen, onLoginOpen, onLoginOpenChange } = useUIContext();
  return (
    <div className=" w-full sm:px-2 lg:px-4  sm:pt-2">
      <div className="bg-sidebar py-2 px-2 sm:rounded-xl flex justify-between gap-4 outline-1 outline-indigo-500/15">
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
          <Button variant="shadow" color="primary" onPress={onLoginOpen}>
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
