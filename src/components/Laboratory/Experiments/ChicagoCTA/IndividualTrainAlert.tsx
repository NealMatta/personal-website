import { TrainAlertProps } from '@/src/types/cta';

export default function TrainAlert({ data }: TrainAlertProps) {
  const fullArrivalTime = new Date(data.arrivalTime);
  const today = new Date();
  const timeInMs = Math.abs(fullArrivalTime.getTime() - today.getTime());

  let timeInMins: string | number = Math.round(timeInMs / 1000 / 60);

  if (timeInMins === 0 || timeInMins === 1) {
    timeInMins = 'Due';
  }

  return (
    <div className="grid grid-cols-3 items-center bg-[#C92032] text-white p-4 rounded-sm shadow-md mb-3">
      {/* Left Column: Train Details */}
      <div className="col-span-2">
        <div className="text-sm font-semibold">
          {data.route} Line #{data.trainNumber} to
        </div>
        <div className="text-2xl font-bold">{data.destination}</div>
      </div>

      {/* Right Column: Arrival Time */}
      <div className="col-span-1 text-right flex flex-col items-end justify-center">
        <div className="text-3xl font-bold">
          {timeInMins}
          {timeInMins !== 'Due' && <span className="text-lg"> min</span>}
        </div>
      </div>
    </div>
  );
}
