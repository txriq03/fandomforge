"use client";

import useOwnProfile from "@/hooks/useOwnProfile";
import { getPfp } from "@/lib/supabase/utils";
import { useUIContext } from "@/providers/UIContext";
import { useUser } from "@/providers/UserProvider";
import { Navbar, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Avatar } from "@heroui/avatar";
import { RiSearch2Line } from "react-icons/ri";
import { TbArrowBack, TbArrowLeft, TbUser } from "react-icons/tb";
import { Button } from "@heroui/button";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "@/providers/SidebarProvider";

const Topbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { collapsed } = useSidebar();
  const user = useUser();
  const { data: profile } = useOwnProfile();
  const { authModal, openProfileModal } = useUIContext();

  const isHomePage = pathname === "/";
  return (
    <Navbar
      maxWidth="full"
      isBlurred={false}
      position="sticky"
      classNames={{
        base: `fixed top-0  bg-transparent `,
      }}
      shouldHideOnScroll={true}
    >
      {/* Left side*/}
      {!isHomePage && (
        <NavbarContent
          className={`transition-all duration-500 ${
            collapsed ? "lg:ml-[64px]" : "lg:ml-[216px]"
          }`}
        >
          <NavbarItem>
            <Button
              isIconOnly
              variant="light"
              radius="lg"
              onPress={() => {
                router.push("/");
              }}
            >
              <TbArrowLeft size={24} />
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}

      {/* Right side */}
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
