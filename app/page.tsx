import DevelopmentAlert from "@/Components/DevelopmentAlert";
import BannerCarousel from "@/Components/BannerCarousel";
import TrendingCarousel from "@/Components/TrendingCarousel";
import ReviewCarousel from "@/Components/ReviewCarousel";

export default async function HomePage() {
  return (
    <div className="space-y-4 pb-4">
      <div className="h-[40vh] sm:h-[50vh] lg:h-[60vh] ">
        <BannerCarousel />
      </div>
      <DevelopmentAlert />
      <TrendingCarousel />
      <ReviewCarousel />
    </div>
  );
}
