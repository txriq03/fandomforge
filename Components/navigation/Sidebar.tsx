"use client";
import { cn } from "@/lib/utils";
import { Button, Divider } from "@heroui/react";
import { ChevronRight, LogIn } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/providers/SidebarProvider";
import { navItems } from "@/lib/data/navItems";
import SidebarFooter from "../SidebarFooter";
import { useUser } from "@/providers/UserProvider";
import { useUIContext } from "@/providers/UIContext";

const Sidebar = () => {
  const { collapsed, toggleCollapsed } = useSidebar();
  const user = useUser();
  const { onLoginOpen } = useUIContext();

  const pathname = usePathname();

  return (
    <div
      className="group/sidebar fixed hidden lg:block h-screen shadow-xl"
      data-state={collapsed ? "closed" : "open"}
    >
      <aside
        className={cn(
          "h-full bg-sidebar transition-all duration-500  flex flex-col ease-in-out relative ",
          collapsed ? "w-16 p-3" : "w-58 p-3"
        )}
      >
        <Button
          isIconOnly
          variant="light"
          onPress={toggleCollapsed}
          className="absolute right-[-12] min-w-0 min-h-0 w-6 h-6 top-12 bg-sidebar "
          radius="full"
        >
          <ChevronRight
            size={14}
            className={cn(
              "transition-transform duration-500 group-data-[state=open]/sidebar:rotate-180"
            )}
          />
        </Button>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            let isActive;
            if (item.href != "/") {
              isActive = pathname.startsWith(item.href);
            } else {
              isActive = pathname === "/";
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg text-foreground/65 text-sm hover:text-primary  transition-all duration-400 text-nowrap",
                  collapsed ? "justify-center p-2.5" : "gap-2 p-3",
                  isActive && "bg-primary-light text-indigo-50"
                )}
              >
                <item.icon size={18} className="leading-none" />
                <span
                  className={cn(
                    "transition-all duration-400",
                    !collapsed
                      ? `opacity-100 w-auto `
                      : "opacity-0 w-0 overflow-hidden"
                  )}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {user ? (
          <div className="mt-auto gap-4 flex flex-col">
            <Divider />
            <SidebarFooter />
          </div>
        ) : (
          <Button
            isIconOnly={collapsed}
            color="primary"
            onPress={onLoginOpen}
            className="mt-auto"
          >
            {collapsed ? <LogIn size={18} /> : "Login"}
          </Button>
        )}
      </aside>
    </div>
  );
};

export default Sidebar;
