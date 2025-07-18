"use client";
import { Movie } from "@/types/movie";
import TVSeries from "@/types/tv";
import { Tabs, Tab } from "@heroui/tabs";
import Padding from "../ui/Padding";
import useIsMobile from "@/hooks/useIsMobile";
import { Alert } from "@heroui/react";
import { usePathname } from "next/navigation";

const MediaTabs = ({ media }: { media: Movie | TVSeries }) => {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  const type = media.media_type === "tv" ? "tv show" : media.media_type;
  return (
    <Padding className="overflow-x-scroll">
      <Tabs
        variant="underlined"
        color="primary"
        size={isMobile ? "md" : "lg"}
        selectedKey={pathname}
        classNames={{
          tabList: "flex justify-center",
        }}
      >
        <Tab
          key={`/movie/${media.id}`}
          title="Overview"
          href={`/movie/${media.id}`}
        />

        <Tab key="/activity" title="Activity" href="/activity">
          <Alert
            title="No content"
            description={`There has been no activity for this ${type}.`}
          />
        </Tab>
        <Tab
          key={`/movie/${media.id}/comments`}
          title="Comments"
          href={`/movie/${media.id}/comments`}
        />
      </Tabs>
    </Padding>
  );
};

export default MediaTabs;
