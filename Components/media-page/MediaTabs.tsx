"use client";
import { Movie } from "@/types/movie";
import TVSeries from "@/types/tv";
import { Tabs, Tab } from "@heroui/tabs";
import Padding from "../utils/Padding";
import useIsMobile from "@/hooks/useIsMobile";
import { Alert } from "@heroui/react";

const MediaTabs = ({ media }: { media: Movie | TVSeries }) => {
  const isMobile = useIsMobile();

  const type = media.media_type === "tv" ? "tv show" : media.media_type;
  return (
    <Padding className="overflow-x-scroll">
      <Tabs
        variant="underlined"
        color="primary"
        size={isMobile ? "md" : "lg"}
        classNames={{
          tabList: "flex justify-center",
        }}
      >
        <Tab key="Overview" title="Overview">
          <Alert
            title="No content"
            description="Not enough information to provide an overview."
          />
        </Tab>
        <Tab key="Activity" title="Activity">
          <Alert
            title="No content"
            description={`There has been no activity for this ${type}.`}
          />
        </Tab>
        <Tab key="Comments" title="Comments" />
      </Tabs>
    </Padding>
  );
};

export default MediaTabs;
