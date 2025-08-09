"use client";

import useOwnProfile from "@/hooks/useOwnProfile";
import { useUIContext } from "@/providers/UIContext";
import { useUser } from "@/providers/UserProvider";
import { Navbar, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Avatar } from "@heroui/avatar";
import { User } from "@heroui/user";
import { RiSearch2Line } from "react-icons/ri";
import { TbArrowLeft, TbMenu, TbUser } from "react-icons/tb";
import { Button } from "@heroui/button";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "@/providers/SidebarProvider";
import { getPfp } from "@/lib/supabase/utils";
import Link from "next/link";

const Topbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { collapsed } = useSidebar();
  const user = useUser();
  const { data: profile } = useOwnProfile();
  const { authModal, profileDrawer, mobileSidebar } = useUIContext();

  const isHomePage = pathname === "/";
  return (
    <Navbar
      maxWidth="full"
      isBlurred={false}
      classNames={{
        base: `fixed top-0  bg-transparent `,
      }}
      shouldHideOnScroll={true}
    >
      <NavbarContent className="lg:hidden">
        <NavbarItem>
          <Button
            isIconOnly
            variant="light"
            radius="lg"
            onPress={mobileSidebar.onOpen}
          >
            <TbMenu size={24} />
          </Button>
        </NavbarItem>
      </NavbarContent>

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
              radius="full"
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
          <Button
            isIconOnly
            variant="light"
            radius="full"
            as={Link}
            href="/browse"
          >
            <RiSearch2Line size={24} />
          </Button>
        </NavbarItem>

        <NavbarItem>
          {user ? (
            <User
              name={profile?.username}
              description={`Level ${profile?.level}`}
              avatarProps={{
                src: getPfp(profile?.avatar_url),
              }}
              isFocusable
              onClick={profileDrawer.onOpen}
              classNames={{
                base: "hover:brightness-75 duration-200 transition-filter cursor-pointer bg-background/50 rounded-full pr-5",
                description: "text-white/50",
              }}
            />
          ) : (
            <Button
              isIconOnly
              variant="light"
              radius="full"
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
