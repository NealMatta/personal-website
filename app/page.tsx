import About from '@/src/components/pages/About/About';
import FeaturedProjects from '@/src/components/pages/Projects/FeaturedProjects';
import HomePageHeader from '@/src/components/pages/Home/HomePagerHeader';
import Quotes from '@/src/components/pages/Home/Quotes/Quotes';
import WebsiteStatusCard from '@/src/components/pages/Home/WebsiteStatus/WebsiteStatusCard';
import SubmitFeedbackCard from '@/src/components/pages/Home/SubmitFeedback/SubmitFeedbackCard';
import SpotifyStatusCard from '@/src/components/pages/Home/Spotify/SpotifyStatusCard';

export default function Home() {
  return (
    <>
      <HomePageHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-4">
        {/* Main Content */}
        <main className="col-span-2 space-y-4">
          <About />
          <Quotes />
          <FeaturedProjects />
        </main>

        {/* Sidebar */}
        <aside className="space-y-4">
          <WebsiteStatusCard />
          {/* <SpotifyCard /> */}
          <SpotifyStatusCard />
          <SubmitFeedbackCard />
        </aside>
      </div>
    </>
  );
}
