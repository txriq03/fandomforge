"use client";
import { cn } from "@/lib/utils";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { ChevronRight, LogIn } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/providers/SidebarProvider";
import { navItems } from "@/lib/data/navItems";
import SidebarFooter from "../SidebarFooter";
import { useUser } from "@/providers/UserProvider";
import { useUIContext } from "@/providers/UIContext";
import FollowList from "../sidebar/FollowList";

const Sidebar = () => {
  const { collapsed, toggleCollapsed } = useSidebar();
  const user = useUser();
  const { authModal } = useUIContext();

  const pathname = usePathname();

  return (
    <div
      className="group/sidebar fixed hidden lg:block h-screen z-50"
      data-state={collapsed ? "closed" : "open"}
    >
      <aside
        className={cn(
          "h-full  bg-transition transition-all duration-500  flex flex-col ease-in-out relative",
          collapsed ? " p-5" : "w-54 p-3"
        )}
      >
        {/* <Button
          isIconOnly
          variant="light"
          onPress={toggleCollapsed}
          className="absolute right-[-12] min-w-0 min-h-0 w-6 h-6 top-12 bg-sidebar"
          radius="full"
        >
          <ChevronRight
            size={14}
            className={cn(
              "transition-transform duration-500 group-data-[state=open]/sidebar:rotate-180"
            )}
          />
        </Button> */}

        {/* Navbar for above mobile view port */}
        <nav className="flex flex-col gap-1 my-auto">
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
                  "flex items-center rounded-lg text-foreground/65 text-base hover:text-primary dark:hover:text-primary-light  transition-all duration-400 text-nowrap",
                  collapsed ? "justify-center p-2.5 text-sm" : "gap-2 p-2.5",
                  isActive &&
                    "bg-white/10 text-indigo-50 hover:text-indigo-50 dark:hover:text-indigo-50"
                )}
              >
                <item.icon size={21} className="leading-none" />
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

        {/* Follow List */}
        {/* {user && (
          <div
            className={cn(
              "my-auto py-10 px-2 text-sm transition-all duration-300 opacity-100",
              collapsed && "opacity-0"
            )}
          >
            <FollowList />
          </div>
        )} */}

        {/* Sidebar Footer */}
        {/* <div className="mt-auto gap-4 flex flex-col">
          <Divider />
          {user ? (
            <SidebarFooter />
          ) : (
            <Button
              isIconOnly={collapsed}
              color="primary"
              onPress={authModal.onOpen}
              className="mt-auto"
            >
              {collapsed ? <LogIn size={18} /> : "Login"}
            </Button>
          )}
        </div> */}
      </aside>
    </div>
  );
};

export default Sidebar;
