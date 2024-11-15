import About from '@/src/components/About/About';
export default function Home() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:gap-4">
        <div className="w-full md:w-2/3">
          <About />
        </div>
        <div className="w-full md:w-1/3">
          <About />
          <About />
        </div>
      </div>
    </>
  );
}
