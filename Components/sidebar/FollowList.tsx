"use client";
import { useFollowing } from "@/hooks/useFollowing";
import { getPfp } from "@/lib/supabase/utils";
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
  console.log("Following:", following);

  if (following?.length === 0) return;

  return (
    <div>
      <div className="flex justify-between items-center">
        <p>Following</p>
        <TbSquareRoundedPlusFilled size={18} />
      </div>

      {isPending ? (
        <Card className="bg-black/5 py-2 my-2" shadow="none">
          <Spinner variant="simple" className="mx-auto" />
        </Card>
      ) : (
        following?.map((item: any) => (
          // <div>{item.followed.username}</div>
          <FollowCard key={item.followed_id} followedUser={item} />
        ))
      )}
    </div>
  );
};

const FollowCard = ({ followedUser }: { followedUser: FollowedUser }) => {
  const user = followedUser.followed;
  const avatar = getPfp(user.avatar_url);
  return (
    <div className="py-2 flex gap-2">
      <Badge
        color="success"
        content=""
        placement="bottom-right"
        shape="circle"
        classNames={{
          badge: "bottom-2 right-1 border-sidebar border-3",
        }}
      >
        <Avatar src={avatar} size="sm" />
      </Badge>
      <div className="flex flex-col gap-0">
        <p>{user.username}</p>
        <p className="text-[0.6rem] text-success">online</p>
      </div>
    </div>
  );
};

export default FollowList;
