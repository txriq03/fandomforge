import CarouselAndRecentlyPlayed from "@/Components/CarouselAndRecentlyPlayed";
import LoginModal from "@/Components/LoginModal";
import MovieGrid from "@/Components/MovieGrid";
import { createClient } from "@/lib/supabase/server";
import { DashboardProvider } from "@/providers/DashboardContext";

export default async function DashboardPage() {
  return (
    <>
      <DashboardProvider>
        <div className="px-1 sm:px-2 lg:px-4 space-y-4">
          <CarouselAndRecentlyPlayed />
          <MovieGrid />
        </div>
      </DashboardProvider>
    </>
  );
}
