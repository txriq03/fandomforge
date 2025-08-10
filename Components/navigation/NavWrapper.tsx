"use client";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/providers/SidebarProvider";
import Sidebar from "./Sidebar";
import MobileMenu from "./MobileMenu";
import Topbar from "./Topbar";
import Footer from "../Footer";
import ReviewModal from "../ReviewModal";

const NavWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="font-main">
      <Sidebar />
      {/* <MobileMenu /> */}
      <ReviewModal />
      <main className={cn("transition-all duration-500 relative")}>
        <Topbar />
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default NavWrapper;
