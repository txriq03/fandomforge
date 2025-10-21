import MediaBanner from "@/Components/media-page/MediaBanner";
import MediaTabs from "@/Components/media-page/MediaTabs";
import MediaHeader from "@/Components/MediaHeader";
import Container from "@/Components/ui/Container";
import { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}

const MovieLayout = async ({ children }: PageProps) => {
  return (
    <>
      <MediaBanner />

      <Container symmetrical>
        <div className="lg:max-w-[1300px] mx-auto">
          <MediaHeader />
          <MediaTabs />
          {children}
        </div>
      </Container>
    </>
  );
};

export default MovieLayout;
