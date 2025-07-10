"use client";
import useOwnProfile from "@/hooks/useOwnProfile";
import useProfile from "@/hooks/useProfile";
import { isSameUser } from "@/lib/supabase/utils";
import { useUIContext } from "@/providers/UIContext";
import { useUser } from "@/providers/UserProvider";
import {
  Avatar,
  Badge,
  Button,
  Modal,
  ModalContent,
  Spinner,
  Tooltip,
} from "@heroui/react";
import { FaPen } from "react-icons/fa";
import { IoChatbubble } from "react-icons/io5";
import { TiUserAdd } from "react-icons/ti";
import { useMediaQuery } from "usehooks-ts";
import ProfileModalTabs from "./ProfileModalTabs";
import { cn } from "@/lib/utils";

const ProfileModal = ({ className }: { className?: string }) => {
  const user = useUser();
  const { profileModal } = useUIContext();
  const { data: profile, isPending } = useProfile(user?.user_metadata.username);
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <Modal
      isOpen={profileModal.isOpen}
      onOpenChange={profileModal.onOpenChange}
      size="xl"
      className={cn("font main", className)}
    >
      {isPending || !profile ? (
        <Spinner variant="simple" size="lg" />
      ) : (
        <>
          <ModalContent>
            {(onClose) => (
              <>
                {/* Banner area*/}
                <div className="relative w-full h-[150px] sm:h-[200px] bg-[#232634]">
                  <div className="w-[50px] h-[8px] rounded-full bg-white/10 absolute top-0 mt-2 left-1/2 -translate-x-1/2  sm:hidden" />
                  <div className="px-5 absolute -bottom-15 ">
                    <Badge
                      color="success"
                      content=""
                      placement="bottom-right"
                      size="lg"
                      shape="circle"
                      classNames={{
                        badge: "h-7 w-7",
                      }}
                    >
                      <Avatar
                        src="/default_pfp.png"
                        className="h-30 w-30  left-0"
                        classNames={{
                          base: "border-5 border-white", // Replace with your custom color
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
                    <ProfileModalTabs />
                  </div>
                </div>
              </>
            )}
          </ModalContent>
        </>
      )}
    </Modal>
  );
};

export default ProfileModal;
