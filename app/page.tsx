import About from '@/src/components/About/About';
import BasicCard from '@/src/components/card/BasicCard';

export default function Home() {
  return (
    <div className="container mt-5 md:mt-20">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Good Afternoon</h1>
        {/* Morning, Afternoon, and Evening changes depending on time */}
        <h3 className="text-xl ">It&apos;s November 16 2024</h3>
      </div>

      <div className="flex">
        <div className="w-full">
          <About />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:gap-4">
        <div className="w-full md:w-2/3">
          <BasicCard>Projects</BasicCard>
          <BasicCard>Submit Feedback</BasicCard>
        </div>
        <div className="w-full md:w-1/3">
          <BasicCard>Weather in Chicago</BasicCard>
          <BasicCard>Resume Creator</BasicCard>
          <BasicCard>Last Listened To</BasicCard>
        </div>
      </div>
    </div>
  );
}
