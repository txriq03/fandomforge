"use client";
import SearchBox from "../SearchBox";
import { Button } from "@heroui/react";
import { Bell, LogIn, LogOut, Settings } from "lucide-react";
import { useUIContext } from "@/providers/UIContext";
import { useAuthContext } from "@/providers/AuthContext";
import { signOut } from "@/lib/supabase/actions";

const Topbar = ({ user }: any) => {
  const { onLoginOpen } = useUIContext();
  const { session } = useAuthContext();

  return (
    <div className=" w-full sm:px-2 lg:px-4  sm:pt-2">
      <div className="bg-sidebar py-2 px-2 sm:rounded-xl flex justify-between gap-4 outline-1 outline-indigo-500/15">
        <SearchBox />
        <div className="flex gap-2">
          {!user ? (
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
              <Button
                isIconOnly
                variant="flat"
                color="danger"
                className="p-2.5"
                radius="full"
                onPress={signOut}
              >
                <LogOut />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
