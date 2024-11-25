'use client';
import React, { useState, useEffect } from 'react';
import BarebonesCard from '../cards/BarebonesCard';
import PrimaryButton from '../UI/PrimaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { fetchCommits } from '@/src/services/githubAPI';

export default function WebsiteStatus() {
  const [commitCount, setCommitCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCommits = async () => {
      try {
        const commits = await fetchCommits();
        setCommitCount(commits.length);
      } catch (error) {
        console.error('Error loading commits:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCommits();
  }, []);

  return (
    <BarebonesCard title="Website Status">
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="text-center">
            <p className="text-gray-500">Loading commit data...</p>
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
