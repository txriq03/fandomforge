"use client";
import { Movie } from "@/types/movie";
import TVSeries from "@/types/tv";
import { Tabs, Tab } from "@heroui/tabs";
import Padding from "../ui/Padding";
import useIsMobile from "@/hooks/useIsMobile";
import { usePathname } from "next/navigation";

const MediaTabs = ({ media }: { media: Movie | TVSeries }) => {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  const type = media.media_type;
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
          key={`/${type}/${media.id}`}
          title="Overview"
          href={`/${type}/${media.id}`}
        />

        <Tab
          key={`/${type}/${media.id}/activity`}
          title="Activity"
          href={`/${type}/${media.id}/activity`}
        />

        <Tab
          key={`/${type}/${media.id}/reviews`}
          title="Reviews"
          href={`/${type}/${media.id}/reviews`}
        />
      </Tabs>
    </Padding>
  );
};

export default MediaTabs;
