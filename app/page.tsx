import MediaGrid from "@/Components/MediaGrid";
import TrendingCarousel from "@/Components/TrendingCarousel";
import { DashboardProvider } from "@/providers/DashboardContext";

export default async function DashboardPage() {
  return (
    <DashboardProvider>
      <div className="space-y-4 pb-4">
        <div className="h-[40vh] sm:h-[50vh] lg:h-[60vh] lg:px-4 lg:pt-4">
          <TrendingCarousel />
        </div>

        <MediaGrid className="px-1 sm:px-2 lg:px-4" />
      </div>
    </DashboardProvider>
  );
}
