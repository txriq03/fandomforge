import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { TbDots } from "react-icons/tb";
import { signOut } from "@/lib/supabase/actions";
import { useUIContext } from "@/providers/UIContext";

const ProfilePopoverMenu = () => {
  const { profileModal } = useUIContext();
  return (
    <Dropdown size="sm">
      <DropdownTrigger>
        <Button isIconOnly variant="light">
          <TbDots size={21} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          color="danger"
          variant="flat"
          key="logout"
          onPress={() => {
            profileModal.onClose();
            signOut();
          }}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfilePopoverMenu;
