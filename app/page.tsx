import DevelopmentAlert from "@/Components/DevelopmentAlert";
import MediaGrid from "@/Components/MediaGrid";
import BannerCarousel from "@/Components/BannerCarousel";
import TrendingCarousel from "@/Components/TrendingCarousel";

export default async function HomePage() {
  return (
    <div className="space-y-4 pb-4">
      <div className="h-[40vh] sm:h-[50vh] lg:h-[60vh] ">
        <BannerCarousel />
      </div>
      <DevelopmentAlert />
      <TrendingCarousel />
      {/* <MediaGrid className="px-1 sm:px-2 lg:px-4" /> */}
    </div>
  );
}
