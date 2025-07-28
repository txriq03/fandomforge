import BrowsePopover from "@/Components/browse/BrowsePopover";
import FilterOptions from "@/Components/browse/FilterOptions";
import MainSection from "@/Components/browse/MainSection";
import NowPlaying from "@/Components/browse/NowPlaying";
import PopularNow from "@/Components/browse/PopularNow";
import SearchField from "@/Components/browse/SearchField";
import SearchResults from "@/Components/browse/SearchResults";
import TrendingNow from "@/Components/browse/TrendingNow";
import Padding from "@/Components/ui/Padding";
import { SearchProvider } from "@/providers/SearchProvider";
import { BrowseType } from "@/types/browseType";
import { MediaType } from "@/types/trending";
import React from "react";

interface PageProps {
  params: Promise<{
    browseType: BrowseType;
  }>;
}

const BrowseMediaPage = async ({ params }: PageProps) => {
  const { browseType } = await params;

  const mediaType = browseType as MediaType;

  return (
    <SearchProvider mediaType={mediaType}>
      <Padding className="font-main pt-[75px] pb-[50px] space-y-6">
        {/* Browse Movies/Tv Shows/Reviews popover */}
        <div className="flex gap-2 text-primary-light/25 font-bold font-heading text-3xl lg:text-5xl items-center">
          <h1>Browse</h1>
          <BrowsePopover browseType={browseType} />
        </div>

        {browseType !== "reviews" && (
          <div className="flex flex-row gap-4">
            <SearchField />
            <FilterOptions />
          </div>
        )}

        <MainSection browseType={browseType} />
      </Padding>
    </SearchProvider>
  );
};

export default BrowseMediaPage;
