"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/providers/SidebarProvider";
import { navItems } from "@/lib/constants";
import { useUser } from "@/providers/UserProvider";
import { useUIContext } from "@/providers/UIContext";

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
          collapsed ? " p-5" : "w-54 p-3",
        )}
      >
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
                    "bg-white/10 text-indigo-50 hover:text-indigo-50 dark:hover:text-indigo-50",
                )}
              >
                <item.icon size={21} className="leading-none" />
                <span
                  className={cn(
                    "transition-all duration-400",
                    !collapsed
                      ? `opacity-100 w-auto `
                      : "opacity-0 w-0 overflow-hidden",
                  )}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
