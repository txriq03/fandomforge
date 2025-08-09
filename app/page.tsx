import DevelopmentAlert from "@/Components/DevelopmentAlert";
import BannerCarousel from "@/Components/BannerCarousel";
import TrendingCarousel from "@/Components/TrendingCarousel";
import ReviewCarousel from "@/Components/ReviewCarousel";
import Chatbox from "@/Components/global-chat/GlobalChat";
import RecentReviewsBox from "@/Components/recent-reviews-box/RecentReviewsBox";
import Padding from "@/Components/ui/Padding";
import Container from "@/Components/ui/Container";

export default async function HomePage() {
  return (
    <div className="space-y-4 pb-4">
      <div className="h-[40vh] sm:h-[50vh] lg:h-[60vh] ">
        <BannerCarousel />
      </div>

      <Container className="space-y-4">

      <DevelopmentAlert />
      <TrendingCarousel />
      <ReviewCarousel />

      <Padding className="px-2 sm:px-0 flex flex-col sm:flex-row h-[500px] sm:h-[400px] gap-3">
        <Chatbox className="flex-2" />
        {/* <RecentReviewsBox className="flex-1" /> */}
      </Padding>
      </Container>
    </div>
  );
}
