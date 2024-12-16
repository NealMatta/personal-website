import About from '@/src/components/About/About';
import FeaturedProjects from '@/src/components/Projects/FeaturedProjects';
import PageHeader from '@/src/components/PageHeader/PageHeader';
import Quotes from '@/src/components/Quotes/Quotes';
import WebsiteStatusCard from '@/src/components/WebsiteStatus/WebsiteStatusCard';
import SubmitFeedbackCard from '@/src/components/SubmitFeedback/SubmitFeedbackCard';
import SpotifyStatusCard from '@/src/components/Spotify/SpotifyStatusCard';

export default function Home() {
  return (
    <>
      <PageHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-4 mb-20">
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
