import About from '@/src/components/About/About';
export default function Home() {
  return (
    <div className="container mt-20">
      <div className="mb-4">
        <h1 className="text-3xl">Good Afternoon</h1>
        {/* Morning, Afternoon, and Evening changes depending on time */}
        <h3>It&apos;s November 16 2024</h3>
      </div>
      <div className="flex flex-col md:flex-row md:gap-4">
        <div className="w-full md:w-2/3">
          <About />
        </div>
        <div className="w-full md:w-1/3">
          <About />
          <About />
        </div>
      </div>
    </div>
  );
}
