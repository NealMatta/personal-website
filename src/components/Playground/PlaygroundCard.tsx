import BarebonesCard from '../cards/BarebonesCard';
import Link from 'next/link';

interface PlaygroundCardProps {
  title: string;
  details: string;
  url: string;
}

export default function PlaygroundCard({
  title,
  details,
  url,
}: PlaygroundCardProps) {
  return (
    <Link href={`/playground/${url}`}>
      <BarebonesCard title={title}>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {details}
        </p>
      </BarebonesCard>
    </Link>
  );
}
