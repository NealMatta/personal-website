import { TrainAlertData } from '@/src/types/cta';
import IndividualTrainAlert from './IndividualTrainAlert';

interface TrainStatusViewProps {
  isLoading: boolean;
  isError: boolean;
  allTrainData: TrainAlertData[] | undefined; // Use the flat TrainAlertData type
}

export default function TrainAlertView({
  isLoading,
  isError,
  allTrainData,
}: TrainStatusViewProps) {
  if (isLoading) {
    return <div className="w-full h-24 bg-gray-200 p-4 rounded-sm  mb-3" />;
  }

  if (isError) {
    return (
      <div className="text-red-600">
        Error loading train data. Please try again later.
      </div>
    );
  }

  return (
    <div>
      {allTrainData &&
        allTrainData.map((train, index) => (
          <IndividualTrainAlert key={index} data={train} />
        ))}
    </div>
  );
}
