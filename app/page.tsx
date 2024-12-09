import About from '@/src/components/About/About';
// import BarebonesCard from '@/src/components/cards/BarebonesCard';
import FeaturedProjects from '@/src/components/Projects/FeaturedProjects';
import PageHeader from '@/src/components/PageHeader/PageHeader';
import Quotes from '@/src/components/Quotes/Quotes';
import WebsiteStatusCard from '@/src/components/WebsiteStatus/WebsiteStatusCard';
import SubmitFeedbackCard from '@/src/components/SubmitFeedback/SubmitFeedbackCard';
import SpotifyCard from '@/src/components/Spotify/SpotifyCard';
import SpotifyStatusCard from '@/src/components/Spotify/SpotifyStatusCard';

export default function Home() {
  return (
    <>
      <PageHeader
        header={() => {
          const hours = new Date().getHours();
          if (hours < 12) return 'Good Morning!';
          else if (hours < 18) return 'Good Afternoon!';
          return 'Good Evening!';
        }}
        subHeader={() => {
          const date = new Date();
          const formattedDate = new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }).format(date);

          return `It's ${formattedDate}`;
        }}
      />

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
