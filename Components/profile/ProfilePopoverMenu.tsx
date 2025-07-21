import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { TbArrowRight, TbDots, TbLogout } from "react-icons/tb";
import { signOut } from "@/lib/supabase/actions";
import { useUIContext } from "@/providers/UIContext";
import Link from "next/link";
import { Button } from "@heroui/button";
import { Profile } from "@/types/tables";
import { isSameUser } from "@/lib/supabase/utils";
import { useUser } from "@/providers/UserProvider";

const ProfilePopoverMenu = ({ profile }: { profile: Profile }) => {
  const { profileModal } = useUIContext();
  const user = useUser();

  return (
    <Dropdown size="sm" className="bg-card">
      <DropdownTrigger>
        <Button isIconOnly variant="light">
          <TbDots size={21} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          key="view"
          as={Link}
          onPress={() => profileModal.onClose()}
          href={`/profile/${profile.username}`}
          title="View Profile Page"
          endContent={<TbArrowRight size={18} className="text-primary-light" />}
          classNames={{
            title: "text-primary-light",
            wrapper: "hover:bg-primary-light/100",
          }}
        />

        {isSameUser(user, profile) ? (
          <DropdownItem
            color="danger"
            variant="flat"
            className="text-danger"
            key="logout"
            title="Logout"
            endContent={<TbLogout size={18} />}
            onPress={() => {
              profileModal.onClose();
              signOut();
            }}
          />
        ) : null}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfilePopoverMenu;
