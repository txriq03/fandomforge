"use client";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "../Footer";
import PostReviewModal from "../post-reveiw-modal/PostReviewModal";

const NavWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="font-main">
      <Sidebar />
      <PostReviewModal />
      <main className={cn("transition-all duration-500 relative")}>
        <Topbar />
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default NavWrapper;
