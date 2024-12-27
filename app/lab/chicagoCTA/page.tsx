import { getChicagoRedLineStatus } from '@/src/services/cta/cta';
import TrainAlert from '@/src/components/Laboratory/Experiments/ChicagoCTA/IndividualTrainAlert';

import { TrainAlertProps } from '@/src/types/cta';

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
