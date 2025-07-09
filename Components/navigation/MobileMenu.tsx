"use client";
import { navItem, navItems } from "@/lib/data/navItems";
import { cn } from "@/lib/utils";
import { useUIContext } from "@/providers/UIContext";
import { useUser } from "@/providers/UserProvider";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { LogIn, Settings, User2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { TbMenu3 } from "react-icons/tb";

const MobileMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <Popover
      placement="left"
      backdrop="opaque"
      isOpen={isMobileMenuOpen}
      onOpenChange={setIsMobileMenuOpen}
    >
      <PopoverTrigger>
        <Button
          isIconOnly
          className="lg:hidden fixed bottom-5 right-5 bg-white shadow-xl text-sky-500 "
          radius="lg"
          size="lg"
        >
          <TbMenu3 size={32} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <MobileMenunContent setPopoverOpen={setIsMobileMenuOpen} />
      </PopoverContent>
    </Popover>
  );
};

const MobileMenunContent = ({ setPopoverOpen }: { setPopoverOpen: any }) => {
  const user = useUser();
  const { onLoginOpen } = useUIContext();

  const others: navItem[] = [
    {
      name: "Profile",
      icon: User2,
      href: `/profile/${user?.user_metadata.username}`,
    },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];
  const fullOptions: navItem[] = [...navItems, ...others];

  return (
    <div className="grid grid-cols-3 gap-3 px-1 py-2 font-main">
      {fullOptions.map((item) => {
        const shouldShowAuthItems = () => {
          return !user && (item.name === "Profile" || item.name === "Settings");
        };

        return (
          <div
            key={item.name}
            className={cn(
              "flex flex-col items-center",
              shouldShowAuthItems() && "hidden"
            )}
          >
            <Button
              isIconOnly
              as={Link}
              href={item.href}
              color="primary"
              variant="shadow"
              size="lg"
              onPress={() => setPopoverOpen(false)}
            >
              <item.icon />
            </Button>
            <p className="text-slate-400 text-sm ">{item.name}</p>
          </div>
        );
      })}

      {/* Only show if there's no  user */}
      {!user && (
        <div className={cn("flex flex-col items-center")}>
          <Button
            isIconOnly
            color="primary"
            variant="shadow"
            size="lg"
            onPress={() => {
              onLoginOpen();
              setPopoverOpen(false);
            }}
          >
            <LogIn />
          </Button>
          <p className="text-slate-400 text-sm ">Login</p>
        </div>
      )}
    </div>
  );
};
export default MobileMenu;
