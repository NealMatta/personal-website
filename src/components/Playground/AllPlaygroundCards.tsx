import PlaygroundCard from './PlaygroundCard';
import Link from 'next/link';

export default function AllPlaygroundCards() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((val, index) => (
        <Link key={index} href={`/playground/${index}`} passHref>
          <div className="">
            <PlaygroundCard />
          </div>
        </Link>
      ))}
    </>
  );
}
