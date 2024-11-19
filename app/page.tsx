import About from '@/src/components/About/About';
import BarebonesCard from '@/src/components/cards/BarebonesCard';
import FeaturedProjects from '@/src/components/Projects/FeaturedProjects';
import PageHeader from '@/src/components/PageHeader/PageHeader';

export default function Home() {
  return (
    <>
      <PageHeader
        header="Welcome!"
        subHeader={() => {
          const hours = new Date().getHours();
          const date = new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }).format(new Date());

          let greeting = '';
          if (hours < 12) greeting = 'Good Morning';
          else if (hours < 18) greeting = 'Good Afternoon';
          else greeting = 'Good Evening';

          return `${greeting}! It's ${date}`;
        }}
      />

      <div className="flex flex-col md:flex-row md:gap-4">
        <div className="w-full md:w-2/3">
          <About />
          <BarebonesCard>Quotes</BarebonesCard>
          <FeaturedProjects />
        </div>
        <div className="w-full md:w-1/3">
          <BarebonesCard>Last Listened To</BarebonesCard>
          <BarebonesCard>Favorite Recipe</BarebonesCard>
          <BarebonesCard>Resume Creator</BarebonesCard>
          <BarebonesCard>Submit Feedback</BarebonesCard>
        </div>
      </div>
    </>
  );
}
