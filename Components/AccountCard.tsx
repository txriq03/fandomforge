import statusOptions, { StatusOption } from "@/lib/data/statusOptions";
import { signOut } from "@/lib/supabase/actions";
import { cn } from "@/lib/utils";
import { useUser } from "@/providers/UserProvider";
import Profile from "@/types/profile";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Progress,
  Tooltip,
} from "@heroui/react";
import { ChevronRight, Pen } from "lucide-react";

const AccountCard = ({ profile }: { profile: Profile }) => {
  const user = useUser();

  const fullProfile = {
    ...profile,
    ...user,
  };

  return (
    <Card className="min-w-[300px] bg-card font-main">
      <CardHeader className="gap-5 items-center ">
        <Avatar src="/default_pfp.png" showFallback className="w-25 h-25" />
        <div className="flex flex-col">
          <p className="text-2xl">{fullProfile.username}</p>
          <p className="text-black/50">{fullProfile.email}</p>
        </div>
      </CardHeader>
      <CardBody className="gap-3">
        {/* Progress */}
        <Progress
          maxValue={1000}
          value={700}
          size="sm"
          label={`Level ${fullProfile.level}`}
          showValueLabel
          formatOptions={{ style: "decimal" }}
          className="text-slate-900/60"
          classNames={{
            indicator: "bg-primary-light",
          }}
        />

        {/* Options */}
        <div className="border-1 p-2 border-primary/25 rounded-xl space-y-2 bg-options">
          <div className="flex items-center gap-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-900 p-1.5 rounded-lg transition-all duration-300 cursor-pointer">
            <Pen size={18} />
            <p>Edit Profile</p>
          </div>
          <Divider />
          <Tooltip
            placement="right"
            content={statusOptionsCard()}
            offset={25}
            className="p-0"
          >
            <div className="flex items-center justify-between text-sm hover:bg-slate-100 dark:hover:bg-slate-900 p-1.5 rounded-lg transition-all duration-300 cursor-pointer">
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
          <p className="text-base">Logout</p>
        </Button>
      </CardBody>
    </Card>
  );
};

const statusOptionsCard = () => {
  return (
    <Card className="w-[250px] font-main" radius="sm">
      <CardBody className="gap-1">
        {statusOptions.map((status: StatusOption) => {
          let description;
          if (status.name == "Invisible") {
            description =
              "You will not appear online, but will have full access to FandomForge";
          }

          return (
            <div className="flex gap-2 hover:bg-slate-100 p-1 rounded-md transition-colors cursor-pointer">
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
