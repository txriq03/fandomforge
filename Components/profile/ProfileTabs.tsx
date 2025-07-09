"use client";
import { cn } from "@/lib/utils";
import { Tab, Tabs } from "@heroui/react";
import { History, UsersRound } from "lucide-react";
import { BiStats } from "react-icons/bi";
import { GrOverview } from "react-icons/gr";
const ProfileTabs = () => {
  return (
    <div
      className={cn(
        "flex  bg-slate-50 justify-start sm:justify-center overflow-x-auto"
      )}
    >
      <Tabs variant="underlined" color="primary" aria-label="Profile options">
        <Tab
          key="overview"
          title={
            <div className="flex items-center space-x-2">
              <GrOverview />
              <span>Overview</span>
            </div>
          }
        />
        <Tab
          key="history"
          title={
            <div className="flex items-center space-x-2">
              <History size={16} />
              <span>History</span>
            </div>
          }
        />
        <Tab
          key="social"
          title={
            <div className="flex items-center space-x-2">
              <UsersRound size={16} />
              <span>Social</span>
            </div>
          }
        />
        <Tab
          key="stats"
          title={
            <div className="flex items-center space-x-2">
              <BiStats />
              <span>Stats</span>
            </div>
          }
        />
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
