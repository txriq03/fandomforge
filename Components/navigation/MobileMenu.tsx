import { navItem, navItems } from "@/lib/data/navItems";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@heroui/react";
import { Ellipsis, Menu, Settings, User2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const MobileMenu = () => {
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button
          isIconOnly
          className="lg:hidden fixed bottom-5 right-5 z-50 "
          radius="lg"
          size="lg"
          color="primary"
        >
          <Menu size={32} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <MobileMenunOptionsCard />
      </PopoverContent>
    </Popover>
  );
};

const others: navItem[] = [
  { name: "Profile", icon: User2, href: "/profile" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

const fullOptions: navItem[] = [...navItems, ...others];

const MobileMenunOptionsCard = () => {
  return (
    <div className="grid grid-cols-3 gap-3 px-1 py-2 font-main">
      {fullOptions.map((item) => {
        return (
          <Tooltip content={item.name} delay={500} closeDelay={0}>
            <Button
              isIconOnly
              as={Link}
              href={item.href}
              color="primary"
              variant="shadow"
            >
              <item.icon />
            </Button>
          </Tooltip>
        );
      })}
    </div>
  );
};
export default MobileMenu;
