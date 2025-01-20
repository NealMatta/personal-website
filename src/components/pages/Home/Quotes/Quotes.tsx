import QUOTES from '@/src/mockData/quotes.json';

export default function Quotes() {
  // Pick a random quote
  const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  return (
    <div className="block p-6 border-l-4 border-black rounded-lg">
      <div className="flex flex-col gap-4 text-xl">
        <p className="font-bold">{randomQuote.quote}</p>
        <div className="justify-end">
          <p className="italic text-right">{randomQuote.source}</p>
        </div>
      </div>
    </div>
  );
}
