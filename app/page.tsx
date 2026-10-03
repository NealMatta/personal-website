import Hero from '@/src/components/pages/Home/Hero/Hero';
import Shelf from '@/src/components/pages/Home/Shelf/Shelf';
import LiveWires from '@/src/components/pages/Home/LiveWires/LiveWires';
import FieldNotes from '@/src/components/pages/Home/FieldNotes/FieldNotes';
import QuoteBlock from '@/src/components/pages/Home/QuoteBlock/QuoteBlock';

export default function Home() {
  return (
    <>
      <Hero />
      <Shelf />
      <LiveWires />
      <FieldNotes />
      <QuoteBlock />
    </>
  );
}
