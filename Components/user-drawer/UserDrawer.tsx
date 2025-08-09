"use client";
import useOwnProfile from "@/hooks/useOwnProfile";
import { signOut } from "@/lib/supabase/actions";
import { getPfp } from "@/lib/supabase/utils";
import { useUIContext } from "@/providers/UIContext";
import { useUser } from "@/providers/UserProvider";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { HiUser } from "react-icons/hi2";
import { RiSettings3Fill } from "react-icons/ri";
import { TbHistory } from "react-icons/tb";
import OptionCard from "./OptionCard";

const UserDrawer = () => {
  const { profileDrawer } = useUIContext();
  const { data: profile } = useOwnProfile();
  const user = useUser();

  if (!profile) return null;

  return (
    <Drawer
      isOpen={profileDrawer.isOpen}
      onOpenChange={profileDrawer.onOpenChange}
      shadow="none"
      radius="none"
      className="font-main"
      classNames={{
        base: "sm:data-[placement=right]:m-2 rounded-lg",
      }}
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            x: 0,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 25,
              mass: 1,
            },
          },
          exit: {
            x: 100,
            opacity: 0,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            },
          },
        },
      }}
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="px-4 pt-10 pb-5">
              <div className="bg-white/3 p-5 rounded-[20px] w-full">
                <div className="flex gap-3">
                  <div className="aspect-square h-[100px]">
                    <Avatar
                      src={getPfp(profile.avatar_url)}
                      className="h-full w-full"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-xl">{profile.username}</p>
                    <p className="font-normal text-foreground/50 text-base">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
            </DrawerHeader>
            <DrawerBody className="px-4">
              {/* Options */}
              <div className="flex gap-2">
                <OptionCard
                  name="Settings"
                  Icon={RiSettings3Fill}
                  className="flex-1"
                />
                <OptionCard
                  name="Profile"
                  Icon={HiUser}
                  className="flex-1"
                  href={`/profile/${profile.username}`}
                />
                <OptionCard
                  name="History"
                  Icon={TbHistory}
                  className="flex-1"
                />
              </div>
            </DrawerBody>
            <DrawerFooter>
              <Button
                fullWidth
                color="danger"
                size="lg"
                variant="flat"
                onPress={signOut}
              >
                Log out
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default UserDrawer;
