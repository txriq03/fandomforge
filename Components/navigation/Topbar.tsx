"use client";
import SearchBox from "../SearchBox";
import { Button } from "@heroui/react";
import { Bell, LogIn, Settings } from "lucide-react";
import { useUIContext } from "@/providers/UIContext";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { devLog } from "@/lib/utils";

const getSession = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error("Error fetching session:", error);
  }

  return data;
};

const Topbar = () => {
  const { onLoginOpen } = useUIContext();

  const { data, isPending, error } = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });

  devLog.log("Session data:", data);

  return (
    <div className=" w-full sm:px-2 lg:px-4  sm:pt-2">
      <div className="bg-sidebar py-2 px-2 sm:rounded-xl flex justify-between gap-4 outline-1 outline-indigo-500/15">
        <SearchBox />
        <div className="flex gap-2">
          {!data?.user ? (
            <Button variant="shadow" color="primary" onPress={onLoginOpen}>
              Login <LogIn />
            </Button>
          ) : (
            <>
              <Button
                isIconOnly
                radius="full"
                className="p-2.5 text-primary"
                color="primary"
                variant="flat"
              >
                <Settings />
              </Button>

              <Button
                isIconOnly
                radius="full"
                className="p-2.5 text-primary"
                color="primary"
                variant="flat"
              >
                <Bell />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
