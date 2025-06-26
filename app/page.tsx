import CarouselAndRecentlyPlayed from "@/Components/CarouselAndRecentlyPlayed";
import MovieGrid from "@/Components/MovieGrid";
import PopularCarousel from "@/Components/PopularCarousel";
import { DashboardProvider } from "@/providers/DashboardContext";

export default function DashboardPage() {
  return (
    <DashboardProvider>
      <CarouselAndRecentlyPlayed />
      <MovieGrid />
    </DashboardProvider>
  );
}
