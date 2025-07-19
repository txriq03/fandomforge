import statusOptions, { StatusOption } from "@/lib/data/statusOptions";
import { signOut } from "@/lib/supabase/actions";
import { cn } from "@/lib/utils";
import { useUIContext } from "@/providers/UIContext";
import { useUser } from "@/providers/UserProvider";
import Profile from "@/types/profile";
import { Avatar } from "@heroui/avatar";
import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Tooltip } from "@heroui/tooltip";

import { ChevronRight, User2 } from "lucide-react";
import Link from "next/link";
import { FaPen } from "react-icons/fa";

const AccountCard = ({
  profile,
  setIsPopoverOpen,
}: {
  profile: Profile;
  setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const user = useUser();
  const { profileModal } = useUIContext();
  const fullProfile = {
    ...profile,
    ...user,
  };

  return (
    <Card className="min-w-[300px] font-main p-0">
      <CardHeader className="p-0">
        {/* Banner area */}
        <div className="relative w-full h-[150px] sm:h-[120px] bg-[#232634]">
          <div className="px-3 absolute -bottom-12.5 ">
            {/* Avatar button*/}
            <button
              onClick={() => {
                setIsPopoverOpen(false);
                profileModal.onOpen();
              }}
              className="cursor-pointer group"
            >
              <Badge
                color="success"
                content=""
                placement="bottom-right"
                size="lg"
                shape="circle"
                classNames={{
                  badge: "h-6 w-6 bottom-4 right-4 border-card border-4",
                }}
              >
                <Avatar
                  src="/default_pfp.png"
                  className="h-23 w-23 left-0"
                  classNames={{
                    base: "border-5 border-card",
                    img: "group-hover:brightness-60 transition-all duration-100",
                  }}
                />
              </Badge>
            </button>
          </div>
        </div>
      </CardHeader>

      <CardBody className="gap-2 bg-card">
        {/* Buttons */}
        <div className="flex justify-end">
          <Button size="sm" startContent={<FaPen />}>
            Edit Profile
          </Button>
        </div>

        {/* Names */}
        <div className="flex flex-col">
          <p className="text-lg">{profile.username}</p>
          <p className="text-[0.8rem] text-foreground/50">{user?.email}</p>
        </div>

        {/* Options */}
        <div className="border-1 p-2 border-primary/25 rounded-xl space-y-2 not-dark:bg-options">
          <Link
            href={`/profile/${profile.username}`}
            className="flex items-center gap-2 text-sm hover:bg-slate-100 dark:hover:bg-primary-light/15 p-1.5 rounded-lg transition-all duration-300 cursor-pointer"
          >
            <User2 size={18} />
            <p>Profile</p>
          </Link>
          <Divider />
          <Tooltip
            placement="right"
            content={statusOptionsCard()}
            offset={25}
            className="p-0"
          >
            <div className="flex items-center justify-between text-sm hover:bg-slate-100 dark:hover:bg-primary-light/15 p-1.5 rounded-lg transition-all duration-300 cursor-pointer">
              <div className="flex gap-2 items-center">
                <div className={cn("h-3 w-3 bg-success rounded-full")} />
                <p>Online</p>
              </div>
              <ChevronRight size={16} className="text-primary/60" />
            </div>
          </Tooltip>
        </div>

        {/* Logout */}
        <Button color="danger" variant="flat" onPress={signOut}>
          <p className="text-sm">Logout</p>
        </Button>
      </CardBody>
    </Card>
  );
};

const statusOptionsCard = () => {
  return (
    <Card className="w-[250px] font-main bg-card" radius="sm">
      <CardBody className="gap-1">
        {statusOptions.map((status: StatusOption) => {
          let description;
          if (status.name == "Invisible") {
            description =
              "You will not appear online, but will have full access to FandomForge";
          }

          return (
            <div
              className="flex gap-2 hover:bg-slate-100 dark:hover:bg-primary-light/10 p-1 rounded-md transition-colors cursor-pointer"
              key={status.name}
            >
              <div className="pt-1">{status.icon}</div>
              <div className="flex flex-col">
                {status.name}{" "}
                {description && (
                  <p className="text-[0.8rem] text-slate-500 tracking-tighter">
                    {description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
};

export default AccountCard;
