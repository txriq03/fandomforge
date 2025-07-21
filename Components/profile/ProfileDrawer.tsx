"use client";

import useProfile from "@/hooks/useProfile";
import { isSameUser } from "@/lib/supabase/utils";
import { useUIContext } from "@/providers/UIContext";
import { useUser } from "@/providers/UserProvider";
import { Tooltip } from "@heroui/tooltip";
import { Avatar } from "@heroui/avatar";
import { Drawer, DrawerContent } from "@heroui/drawer";
import { Badge } from "@heroui/badge";
import { FaPen } from "react-icons/fa";
import { IoChatbubble } from "react-icons/io5";
import { TiUserAdd } from "react-icons/ti";
import { useMediaQuery } from "usehooks-ts";
import ProfileModalTabs from "./ProfileModalTabs";
import { cn } from "@/lib/utils";
import ProfilePopoverMenu from "./ProfilePopoverMenu";
import { Spinner } from "@heroui/spinner";
import { Button } from "@heroui/button";

const ProfileDrawer = ({ className }: { className?: string }) => {
  const user = useUser();
  const { profileModal } = useUIContext();
  const { data: profile, isPending } = useProfile(user?.id);
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <Drawer
      isOpen={profileModal.isOpen}
      onOpenChange={profileModal.onOpenChange}
      placement="bottom"
      className={cn("font-main h-[400px]", className)}
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              duration: 0.3,
              mass: 1,
              damping: 18,
              stiffness: 300,
            },
          },
          exit: {
            opacity: 0,
            y: 100,
            transition: {
              duration: 0.2,
            },
          },
        },
      }}
    >
      {isPending || !profile ? (
        <DrawerContent>
          {(onClose) => <Spinner variant="simple" size="lg" className="p-25" />}
        </DrawerContent>
      ) : (
        <DrawerContent>
          {(onClose) => (
            <>
              {/* Banner area*/}
              <div className="relative w-full h-[150px] sm:h-[200px] bg-[#232634]">
                <div className="w-[50px] h-[8px] rounded-full bg-white/10 absolute top-0 mt-2 left-1/2 -translate-x-1/2  sm:hidden" />
                <div className="flex justify-end p-1">
                  <ProfilePopoverMenu profile={profile} />
                </div>
                <div className="px-5 absolute -bottom-15 ">
                  <Badge
                    color="success"
                    content=""
                    placement="bottom-right"
                    size="lg"
                    shape="circle"
                    classNames={{
                      badge: "h-7 w-7 bottom-5 right-5 border-card border-4",
                    }}
                  >
                    <Avatar
                      src="/default_pfp.png"
                      className="h-30 w-30  left-0"
                      classNames={{
                        base: "border-5 border-card", // Replace with your custom color
                      }}
                    />
                  </Badge>
                </div>
              </div>

              {/* Light area */}
              <div className="p-5">
                {/* Buttons */}
                <div className="flex justify-end gap-2">
                  {isSameUser(user, profile) ? (
                    <Button
                      startContent={<FaPen />}
                      className="text-right"
                      size={isMobile ? "sm" : "md"}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Tooltip content="Message" showArrow>
                        <Button isIconOnly size={isMobile ? "sm" : "md"}>
                          <IoChatbubble size={21} />
                        </Button>
                      </Tooltip>
                      <Button
                        radius="sm"
                        color="primary"
                        size={isMobile ? "sm" : "md"}
                        startContent={<TiUserAdd size={21} />}
                      >
                        Add Friend
                      </Button>
                    </>
                  )}
                </div>

                {/* Names */}
                <div className="flex flex-col mt-1">
                  <p className="text-xl sm:text-2xl">{profile.username}</p>
                  <p className="text-foreground/50 text-sm">Display name</p>
                </div>
                <div className="overflow-x-auto">
                  <ProfileModalTabs profile={profile} />
                </div>
              </div>
            </>
          )}
        </DrawerContent>
      )}
    </Drawer>
  );
};

export default ProfileDrawer;
