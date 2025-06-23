"use client";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import BottomBar from "./Bottombar";
import { useSidebar } from "@/providers/SidebarProvider";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const NavWrapper = ({ children }: { children: ReactNode }) => {
  const { collapsed } = useSidebar();
  return (
    <div className="mt-2 mx-2">
      <Sidebar />
      <BottomBar />
      <main
        className={cn(
          "transition-all duration-500 ",
          collapsed ? "lg:ml-[64px]" : "lg:ml-[232px]"
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default NavWrapper;
