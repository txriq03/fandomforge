import { useFollowUser } from "@/hooks/useFollowUser";
import { useIsFollowing } from "@/hooks/useIsFollowing";
import useIsMobile from "@/hooks/useIsMobile";
import { useUnfollowUser } from "@/hooks/useUnfollowUser";
import { Profile } from "@/types/tables";
import { Button } from "@heroui/button";
import React from "react";
import { TiUserAdd, TiUserDelete } from "react-icons/ti";

const FollowToggle = ({ profile }: { profile: Profile }) => {
  const isMobile = useIsMobile();
  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();
  const { data: isFollowing, isPending } = useIsFollowing(profile.id);

  const handleClick = () => {
    if (!profile.id) return;

    if (isFollowing) {
      unfollowMutation.mutate(profile.id);
    } else {
      followMutation.mutate(profile.id);
    }
  };

  const isEitherPending = () => {
    return isPending || followMutation.isPending || unfollowMutation.isPending;
  };

  const ButtonText = () => {
    if (isPending) return "Checking";

    if (isFollowing) {
      if (unfollowMutation.isPending) {
        return "Unfollowing";
      } else {
        return "Unfollow";
      }
    } else {
      if (followMutation.isPending) {
        return "Following";
      } else {
        return "Follow";
      }
    }
  };

  return (
    <Button
      radius="sm"
      color="primary"
      size={isMobile ? "sm" : "md"}
      startContent={
        !isEitherPending() &&
        (isFollowing ? <TiUserDelete size={21} /> : <TiUserAdd size={21} />)
      }
      className="text-sm sm:text-base"
      isLoading={isEitherPending()}
      onPress={handleClick}
    >
      {ButtonText()}
    </Button>
  );
};

export default FollowToggle;
