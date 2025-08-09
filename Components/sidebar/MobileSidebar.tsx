"use client";
import { navItems } from "@/lib/data/navItems";
import { signOut } from "@/lib/supabase/actions";
import { cn } from "@/lib/utils";
import { useUIContext } from "@/providers/UIContext";
import { useUser } from "@/providers/UserProvider";
import { Button } from "@heroui/button";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
} from "@heroui/drawer";
import { ModalProps } from "@heroui/modal";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MobileSidebar = () => {
  const { mobileSidebar } = useUIContext();
  const pathname = usePathname();
  const user = useUser();
  return (
    <Drawer
      isOpen={mobileSidebar.isOpen}
      onOpenChange={mobileSidebar.onOpenChange}
      shadow="none"
      placement="left"
      radius="none"
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            x: 0,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 25,
              mass: 1,
            },
          },
          exit: {
            x: -100,
            opacity: 0,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            },
          },
        },
      }}
      classNames={{
        base: "bg-background font-main",
        wrapper: "w-[250px]",
      }}
    >
      <DrawerContent className="px-4">
        {(onClose) => (
          <>
            <DrawerBody className="px-0">
              <menu className="space-y-2 my-auto">
                {navItems.map((item) => {
                  let isActive;
                  if (item.href != "/") {
                    isActive = pathname.startsWith(item.href);
                  } else {
                    isActive = pathname === "/";
                  }
                  return (
                    <li
                      className={cn(
                        "   text-white/75 font-heading font-semibold",
                        isActive && "font-bold text-foreground"
                      )}
                    >
                      <Button
                        as={Link}
                        href={item.href}
                        fullWidth
                        onPress={mobileSidebar.onClose}
                        startContent={<item.icon size={21} />}
                        className={cn(
                          "text-start align-start justify-start py-5 px-5 bg-transparent text-foreground/70 font-semibold",
                          isActive && "bg-white/5 text-foreground font-bold"
                        )}
                        size="lg"
                      >
                        {item.name}
                      </Button>
                    </li>
                  );
                })}
              </menu>
            </DrawerBody>
            <DrawerFooter className="px-0">
              {user && (
                <Button
                  fullWidth
                  startContent={<LogOut size={18} />}
                  variant="flat"
                  color="danger"
                  onPress={() => {
                    signOut();
                    mobileSidebar.onClose();
                  }}
                >
                  Logout
                </Button>
              )}
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default MobileSidebar;
