"use client";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/providers/SidebarProvider";
import Sidebar from "./Sidebar";
import MobileMenu from "./MobileMenu";
import Topbar from "./Topbar";

const NavWrapper = ({ children }: { children: ReactNode }) => {
  const { collapsed } = useSidebar();
  return (
    <div className="font-main">
      <Sidebar />
      <MobileMenu />
      <main
        className={cn(
          "transition-all duration-500",
          collapsed ? "lg:ml-[64px]" : "lg:ml-[216px]"
        )}
      >
        <Topbar />
        {children}
      </main>
    </div>
  );
};

export default NavWrapper;
