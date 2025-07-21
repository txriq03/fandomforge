"use client";

import useOwnProfile from "@/hooks/useOwnProfile";
import { getPfp } from "@/lib/supabase/utils";
import { useUIContext } from "@/providers/UIContext";
import { useUser } from "@/providers/UserProvider";
import { Navbar, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Avatar } from "@heroui/avatar";
import { RiSearch2Line } from "react-icons/ri";
import { TbUser } from "react-icons/tb";
import { Button } from "@heroui/button";

const Topbar = () => {
  const user = useUser();
  const { data: profile } = useOwnProfile();
  const { authModal, openProfileModal } = useUIContext();
  return (
    <Navbar
      maxWidth="full"
      isBlurred={false}
      classNames={{
        base: "absolute top-0 bg-transparent ",
      }}
    >
      <NavbarContent justify="end" className="gap-1">
        <NavbarItem>
          <Button isIconOnly variant="light" radius="lg">
            <RiSearch2Line size={24} />
          </Button>
        </NavbarItem>
        <NavbarItem>
          {user ? (
            <Avatar
              as="button"
              isFocusable
              onClick={() => openProfileModal(user.id)}
              src={getPfp(profile?.avatar_url)}
              classNames={{
                base: "hover:brightness-50 duration-200 transition-filter cursor-pointer",
              }}
            />
          ) : (
            <Button
              isIconOnly
              variant="light"
              onPress={() => authModal.onOpen()}
            >
              <TbUser size={24} />
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Topbar;
