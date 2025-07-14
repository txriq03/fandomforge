"use client";
import { formatDateTime } from "@/lib/utils";
import { Tab, Tabs } from "@heroui/react";
import { User } from "@supabase/supabase-js";

const ProfileModalTabs = ({ profile }: { profile: any }) => {
  const user: User = profile.user;
  const memberSince = formatDateTime(user.created_at);

  return (
    <Tabs
      variant="underlined"
      className="  pt-2 pl-0 font-main"
      aria-label="Profile options"
      color="primary"
    >
      <Tab key="about me" title={"About Me"}>
        <p className=" text-sm">Member since</p>
        <p className="text-foreground/60 text-[0.8rem]">{memberSince}</p>
      </Tab>
      <Tab key="Mutual Friends" title={"Mutual Friends"}>
        <p className="text-foreground/75 text-sm">Mutual friends</p>
      </Tab>
      <Tab key="Activity" title={"Activity"}>
        <p className="text-foreground/75 text-sm">Activity</p>
      </Tab>
    </Tabs>
  );
};

export default ProfileModalTabs;
