import BrowsePopover from "@/Components/browse/BrowsePopover";
import Padding from "@/Components/ui/Padding";
import { MediaType } from "@/types/trending";
import { Button } from "@heroui/button";
import React from "react";
import { TbChevronDown } from "react-icons/tb";

interface PageProps {
  params: Promise<{
    mediaType: MediaType;
  }>;
}

const BrowseMediaPage = async ({ params }: PageProps) => {
  const { mediaType } = await params;

  return (
    <Padding className="font-main pt-[75px]">
      <div className="flex gap-2 text-primary-light/25 font-bold font-heading text-3xl lg:text-5xl items-center">
        <h1>Browse</h1>

        <BrowsePopover mediaType={mediaType} />
      </div>
    </Padding>
  );
};

export default BrowseMediaPage;
