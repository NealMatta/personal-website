import BarebonesCard from '../cards/BarebonesCard';
import PrimaryButton from '../UI/PrimaryButton';

export default function WebsiteStatus() {
  return (
    <BarebonesCard title={'Submit Feedback'}>
      <div className="flex flex-col gap-4">
        <div className="text-center">
          <p className="text-gray-500">I&apos;d love to hear what you think!</p>
        </div>

        <div className="text-center">
          <PrimaryButton
            linkTo="https://nealmatta.notion.site/15fb9bd7fc6680b7b218cb405427d385?pvs=105"
            aria-label="Submit Feedback"
            className="inline-flex items-center space-x-2"
          >
            <span>Submit Feedback</span>
          </PrimaryButton>
        </div>
      </div>
    </BarebonesCard>
  );
}
