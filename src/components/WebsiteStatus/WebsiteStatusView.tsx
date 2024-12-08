import React from 'react';
import BarebonesCard from '../cards/BarebonesCard';
import PrimaryButton from '../UI/PrimaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

type WebsiteStatusViewProps = {
  isLoading: boolean;
  isError: boolean;
  commitCount: number;
};

export default function WebsiteStatusView({
  isLoading,
  isError,
  commitCount,
}: WebsiteStatusViewProps) {
  return (
    <BarebonesCard title="Website Status">
      <div className="flex flex-col gap-4">
        <div className="text-center">
          {isLoading && (
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-64 bg-gray-200 rounded"></div>
            </div>
          )}

          {isError && (
            <p className="text-red-500">Failed to load commit data.</p>
          )}

          {!isLoading && !isError && (
            <>
              <h3 className="font-bold text-5xl text-gray-800">
                {commitCount}
              </h3>
              <p className="text-gray-500">Commits in the last 30 days</p>
            </>
          )}
        </div>

        <div className="text-center">
          <PrimaryButton
            linkTo="https://github.com/NealMatta/personal-website"
            aria-label="View on GitHub"
            className="inline-flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faGithub} size="lg" className="fa-icon" />
            <span>GitHub</span>
          </PrimaryButton>
        </div>
      </div>
    </BarebonesCard>
  );
}
