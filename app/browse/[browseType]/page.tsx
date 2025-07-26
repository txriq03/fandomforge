import BrowsePopover from "@/Components/browse/BrowsePopover";
import FilterOptions from "@/Components/browse/FilterOptions";
import NowPlaying from "@/Components/browse/NowPlaying";
import PopularNow from "@/Components/browse/PopularNow";
import SearchResults from "@/Components/browse/SearchResults";
import TrendingNow from "@/Components/browse/TrendingNow";
import Padding from "@/Components/ui/Padding";
import { SearchProvider } from "@/providers/SearchProvider";
import { BrowseType } from "@/types/browseType";
import React from "react";

interface PageProps {
  params: Promise<{
    browseType: BrowseType;
  }>;
}

const BrowseMediaPage = async ({ params }: PageProps) => {
  const { browseType } = await params;

  return (
    <SearchProvider>
      <Padding className="font-main pt-[75px] pb-[50px] space-y-6">
        {/* Browse Movies/Tv Shows/Reviews */}
        <div className="flex gap-2 text-primary-light/25 font-bold font-heading text-3xl lg:text-5xl items-center">
          <h1>Browse</h1>
          <BrowsePopover browseType={browseType} />
        </div>
        <FilterOptions />

        {browseType !== "reviews" && (
          <>
            <SearchResults />
            <PopularNow />
            <TrendingNow />
          </>
        )}
        {browseType === "movie" && <NowPlaying />}
      </Padding>
    </SearchProvider>
  );
};

export default BrowseMediaPage;
