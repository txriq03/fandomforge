"use client";
import useProfile from "@/hooks/useProfile";
import { isSameUser } from "@/lib/supabase/utils";
import { useUIContext } from "@/providers/UIContext";
import { useUser } from "@/providers/UserProvider";
import { Modal, ModalContent } from "@heroui/modal";
import { FaPen } from "react-icons/fa";
import { IoChatbubble } from "react-icons/io5";
import { TiUserAdd } from "react-icons/ti";
import { useMediaQuery } from "usehooks-ts";
import ProfileModalTabs from "./ProfileModalTabs";
import { cn } from "@/lib/utils";
import ProfilePopoverMenu from "./ProfilePopoverMenu";
import { Spinner } from "@heroui/spinner";
import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { Avatar } from "@heroui/avatar";
import { useFollowUser } from "@/hooks/useFollowUser";

const ProfileModal = ({ className }: { className?: string }) => {
  const user = useUser();
  const { profileModal, profileUserId } = useUIContext();
  const { data: profile, isPending } = useProfile(profileUserId);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const followMutation = useFollowUser();

  const handleFollow = () => {
    followMutation.mutate(profile?.id);
  };

  return (
    <Modal
      isOpen={profileModal.isOpen}
      onOpenChange={profileModal.onOpenChange}
      size={isPending || !profile ? "sm" : "xl"}
      className={cn("font-main bg-card", className)}
    >
      {isPending || !profile ? (
        <ModalContent>
          {(onClose) => <Spinner variant="simple" size="lg" className="py-5" />}
        </ModalContent>
      ) : (
        <>
          <ModalContent>
            {(onClose) => (
              <>
                {/* Banner area*/}
                <div className="relative w-full h-[150px] sm:h-[170px] bg-[#232634]">
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
                          base: "border-5 border-card",
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
                          startContent={
                            !followMutation.isPending && <TiUserAdd size={21} />
                          }
                          className="text-base"
                          isLoading={followMutation.isPending}
                          onPress={handleFollow}
                        >
                          {followMutation.isPending ? (
                            <p>Following</p>
                          ) : (
                            <p>Follow</p>
                          )}
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
          </ModalContent>
        </>
      )}
    </Modal>
  );
};

export default ProfileModal;
