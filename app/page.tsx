import CarouselAndRecentlyPlayed from "@/Components/CarouselAndRecentlyPlayed";
import MovieGrid from "@/Components/MovieGrid";
import { DashboardProvider } from "@/providers/DashboardContext";

export default async function DashboardPage() {
  return (
    <DashboardProvider>
      <div className="space-y-4 pb-4">
        <CarouselAndRecentlyPlayed className="lg:px-4 lg:pt-4" />
        <MovieGrid className="px-1 sm:px-2 lg:px-4" />
      </div>
    </DashboardProvider>
  );
}
