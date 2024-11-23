import About from '@/src/components/About/About';
import BarebonesCard from '@/src/components/cards/BarebonesCard';
import FeaturedProjects from '@/src/components/Projects/FeaturedProjects';
import PageHeader from '@/src/components/PageHeader/PageHeader';
import Quotes from '@/src/components/Quotes/Quotes';

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

      <div className="flex flex-col gap-4 md:flex-row md:gap-4">
        <div className="flex flex-col w-full md:w-2/3 gap-4">
          <About />
          <Quotes />
          <FeaturedProjects />
        </div>
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <BarebonesCard>Last Listened To</BarebonesCard>
          <BarebonesCard>Favorite Recipe</BarebonesCard>
          <BarebonesCard>Resume Creator</BarebonesCard>
          <BarebonesCard>Submit Feedback</BarebonesCard>
        </div>
      </div>
    </>
  );
}
