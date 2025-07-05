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
} from "@heroui/react";
import { ChevronRight, Pen } from "lucide-react";

const AccountCard = ({ profile }: { profile: Profile }) => {
  const user = useUser();

  const fullProfile = {
    ...profile,
    ...user,
  };

  return (
    <Card className="min-w-[300px] bg-slate-50">
      <CardHeader className="gap-5 items-center">
        <Avatar src="/default_pfp.png" showFallback className="w-25 h-25" />
        <div className="flex flex-col">
          <p className="text-2xl">{fullProfile.username}</p>
          <p className="text-black/50">{fullProfile.email}</p>
        </div>
      </CardHeader>
      <CardBody className="gap-3">
        <div className="border-1 p-2 border-primary/25 rounded-lg space-y-2 bg-white">
          <div className="flex items-center gap-2 text-base hover:bg-slate-100 p-1.5 rounded-lg transition-all duration-300 cursor-pointer">
            <Pen size={18} />
            <p>Edit Profile</p>
          </div>
          <Divider />
          <div className="flex items-center justify-between text-base hover:bg-slate-100 p-1.5 rounded-lg transition-all duration-300 cursor-pointer">
            <div className="flex gap-2 items-center">
              <div className={cn("h-3 w-3 bg-success rounded-full")} />
              <p>Online</p>
            </div>
            <ChevronRight size={16} className="text-primary/60" />
          </div>
        </div>

        <Button color="danger" variant="flat" onPress={signOut}>
          <p className="text-base">Logout</p>
        </Button>
      </CardBody>
    </Card>
  );
};

export default AccountCard;
