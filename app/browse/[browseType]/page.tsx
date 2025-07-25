import BrowsePopover from "@/Components/browse/BrowsePopover";
import FilterOptions from "@/Components/browse/FilterOptions";
import MediaGrid from "@/Components/browse/MediaGrid";
import Padding from "@/Components/ui/Padding";
import { BrowseType } from "@/types/browseType";
import { MediaType } from "@/types/trending";
import { Button } from "@heroui/button";
import React from "react";
import { TbChevronDown } from "react-icons/tb";

interface PageProps {
  params: Promise<{
    browseType: BrowseType;
  }>;
}

const BrowseMediaPage = async ({ params }: PageProps) => {
  const { browseType } = await params;

  return (
    <Padding className="font-main pt-[75px] space-y-6">
      <div className="flex gap-2 text-primary-light/25 font-bold font-heading text-3xl lg:text-5xl items-center">
        <h1>Browse</h1>

        <BrowsePopover browseType={browseType} />
      </div>
      <FilterOptions />
      <MediaGrid />
    </Padding>
  );
};

export default BrowseMediaPage;
