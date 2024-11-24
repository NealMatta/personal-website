import BarebonesCard from '../cards/BarebonesCard';
import PrimaryButton from '../UI/PrimaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function WebsiteStatus() {
  const commitCount = 45; // Replace with API fetch logic later

  return (
    <BarebonesCard>
      <div className="flex flex-col gap-4">
        <h1 className="font-bold">
          <span>Website Status</span>
        </h1>

        <div className="text-center">
          <h3 className="font-bold text-5xl text-gray-700">{commitCount}</h3>
          <p className="text-gray-500">Commits in the past month</p>
        </div>

        <div className="text-center">
          <PrimaryButton
            linkTo="https://github.com/NealMatta/personal-website"
            aria-label="View on GitHub"
            className="inline-flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
            <span>Github</span>
          </PrimaryButton>
        </div>
      </div>
    </BarebonesCard>
  );
}
