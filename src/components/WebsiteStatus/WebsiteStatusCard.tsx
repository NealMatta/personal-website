'use client';
import React from 'react';
import BarebonesCard from '../cards/BarebonesCard';
import PrimaryButton from '../UI/PrimaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchCommits } from '@/src/services/githubAPI';

type Commit = {
  sha: string;
  commit: {
    author: {
      name: string;
      date: string;
    };
    message: string;
  };
};

export default function WebsiteStatus() {
  const {
    data: commits,
    isLoading,
    isError,
  }: UseQueryResult<Commit[], Error> = useQuery({
    queryKey: ['commits'], // Define your query key
    queryFn: fetchCommits, // Define the function to fetch data
  });

  const commitCount = commits?.length ?? 0;

  return (
    <BarebonesCard title="Website Status">
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="text-center">
            <p className="text-gray-500">Loading commit data...</p>
          </div>
        ) : isError ? (
          <div className="text-center">
            <p className="text-red-500">Failed to load commit data.</p>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h3 className="font-bold text-5xl text-gray-700">
                {commitCount}
              </h3>
              <p className="text-gray-500">Commits in the repository</p>
            </div>

            <div className="text-center">
              <PrimaryButton
                linkTo="https://github.com/NealMatta/personal-website"
                aria-label="View on GitHub"
                className="inline-flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faGithub} size="lg" />
                <span>GitHub</span>
              </PrimaryButton>
            </div>
          </>
        )}
      </div>
    </BarebonesCard>
  );
}
