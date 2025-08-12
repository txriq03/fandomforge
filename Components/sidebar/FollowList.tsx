"use client";
import { useFollowing } from "@/hooks/useFollowing";
import { getPfp } from "@/lib/supabase/utils";
import { devLog } from "@/lib/utils";
import { useUIContext } from "@/providers/UIContext";
import { Avatar } from "@heroui/avatar";
import { Badge } from "@heroui/badge";
import { Card } from "@heroui/card";
import { Spinner } from "@heroui/spinner";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";

type FollowedUser = {
  followed_id: string;
  followed: {
    avatar_url: string;
    id: string;
    username: string;
  };
};

const FollowList = () => {
  const { data: following, isPending } = useFollowing();

  if (following?.length === 0) return;

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <p>Following</p>
          <p className="text-[0.7rem] text-primary-light/80">
            ({following?.length})
          </p>
        </div>
        <TbSquareRoundedPlusFilled size={18} />
      </div>

      <div className="py-2 flex flex-col gap-2">
        {isPending ? (
          <Card className="bg-black/5 py-2" shadow="none">
            <Spinner variant="simple" className="mx-auto" />
          </Card>
        ) : (
          following?.map((item: any) => (
            <FollowCard key={item.followed_id} followedUser={item} />
          ))
        )}
      </div>
    </div>
  );
};

const FollowCard = ({ followedUser }: { followedUser: FollowedUser }) => {
  const { openProfileModal } = useUIContext();
  const user = followedUser.followed;
  const avatar = getPfp(user.avatar_url);
  return (
    <button
      className=" flex gap-2 bg-primary-light/5 hover:bg-primary-light/10 transition-all duration-300 w-full rounded-full cursor-pointer"
      onClick={() => openProfileModal(user.id)}
    >
      <Badge
        color="success"
        content=""
        placement="bottom-right"
        shape="circle"
        classNames={{
          badge: "bottom-2 right-1 border-sidebar border-3",
        }}
      >
        <Avatar src={avatar} />
      </Badge>
      <div className="flex flex-col gap-0 text-left">
        <p>{user.username}</p>
        <p className="text-[0.7rem] text-success">online</p>
      </div>
    </button>
  );
};

export default FollowList;
