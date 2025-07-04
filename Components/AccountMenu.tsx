import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { Bell, ChevronDown, LogOut, Settings, User2 } from "lucide-react";
import { signOut } from "@/lib/supabase/actions";
const AccountMenu = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          size="sm"
          radius="full"
          variant="light"
          className="hidden sm:flex"
        >
          <ChevronDown size={21} className="text-slate-900/50" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat">
        <DropdownItem key="profile" startContent={<User2 size={16} />}>
          Profile
        </DropdownItem>
        <DropdownItem key="notifications" startContent={<Bell size={16} />}>
          Notifications
        </DropdownItem>
        <DropdownItem key="settings" startContent={<Settings size={16} />}>
          Settings
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className="text-danger"
          startContent={<LogOut size={16} />}
          onPress={signOut}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default AccountMenu;
