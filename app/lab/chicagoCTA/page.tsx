import { getChicagoRedLineStatus } from '@/src/services/cta/cta';
import TrainAlert from '@/src/components/Laboratory/Experiments/ChicagoCTA/IndividualTrainAlert';

interface TrainAlertProps {
  data: {
    stationName: string; // Station Name
    destination: string; // Destination Name
    arrivalTime: string; // Arrival Time
    route: string; // Route (e.g., Red, Blue)
    trainNumber: string; // Train number
  };
}

export default async function ChicagoCTA() {
  const trainData = await getChicagoRedLineStatus();

  return (
    <div>
      {trainData.map((train: TrainAlertProps['data'], index: number) => (
        <TrainAlert key={index} data={train} />
      ))}
    </div>
  );
}
