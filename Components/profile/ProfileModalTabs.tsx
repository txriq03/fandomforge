"use client";
import { Tab, Tabs } from "@heroui/react";

const ProfileModalTabs = () => {
  return (
    <Tabs
      variant="underlined"
      className="  pt-2 pl-0"
      aria-label="Profile options"
      color="primary"
    >
      <Tab key="about me" title={"About Me"}>
        <p className="text-foreground/75 text-sm">About me</p>
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
