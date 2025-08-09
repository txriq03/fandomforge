"use client";
import { Movie } from "@/types/movie";
import TVSeries from "@/types/tv";
import { Tabs, Tab } from "@heroui/tabs";
import Padding from "../ui/Padding";
import useIsMobile from "@/hooks/useIsMobile";
import { usePathname } from "next/navigation";
import { useMedia } from "@/providers/MediaProvider";
import Link from "next/link";

const MediaTabs = () => {
  const media: Movie | TVSeries = useMedia();
  const isMobile = useIsMobile();
  const pathname = usePathname();

  const type = media.media_type;
  return (
    <div className="overflow-x-scroll px-4 lg:px-0">
      <Tabs
        variant="underlined"
        color="primary"
        size={isMobile ? "md" : "lg"}
        selectedKey={pathname}
        aria-label="Tabs"
        classNames={{
          tabList: "flex justify-center",
        }}
      >
        <Tab
          key={`/${type}/${media.id}`}
          title="Overview"
          href={`/${type}/${media.id}`}
          as={Link}
        />

        <Tab
          key={`/${type}/${media.id}/activity`}
          title="Activity"
          href={`/${type}/${media.id}/activity`}
          as={Link}
        />

        <Tab
          key={`/${type}/${media.id}/reviews`}
          title="Reviews"
          href={`/${type}/${media.id}/reviews`}
          as={Link}
        />
      </Tabs>
    </div>
  );
};

export default MediaTabs;
