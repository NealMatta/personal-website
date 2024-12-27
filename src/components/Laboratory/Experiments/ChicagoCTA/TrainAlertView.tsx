import { TrainAlertProps } from '@/src/types/cta';
import IndividualTrainAlert from './IndividualTrainAlert';

interface TrainStatusViewProps {
  isLoading: boolean;
  isError: boolean;
  allTrainData: TrainAlertProps['data'][] | undefined;
}

export default function TrainAlertView({
  isLoading,
  isError,
  allTrainData,
}: TrainStatusViewProps) {
  // Handle loading state
  if (isLoading) {
    return <div>Loading train data...</div>;
  }

  // Handle error state
  if (isError) {
    return <div>Error loading train data. Please try again later.</div>;
  }

  // Render train data
  return (
    <div>
      {allTrainData &&
        allTrainData.map((train, index) => (
          // Pass the correct train data to IndividualTrainAlert
          <IndividualTrainAlert key={index} data={train} />
        ))}
    </div>
  );
}
