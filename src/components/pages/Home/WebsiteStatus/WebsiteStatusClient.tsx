'use client';

import { useQuery } from '@tanstack/react-query';
import WebsiteStatusView from './WebsiteStatusView';

async function fetchCommits() {
  const response = await fetch('/api/github/commits');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}

export default function WebsiteStatusClient() {
  // Client-side logic: Fetch commits
  const { data, isLoading, isError } = useQuery({
    queryKey: ['commits'],
    queryFn: fetchCommits,
  });

  // Compute the commit count
  const commitCount = data?.length || 0;

  // Pass all data and states to the presentational component
  return (
    <WebsiteStatusView
      isLoading={isLoading}
      isError={isError}
      commitCount={commitCount}
    />
  );
}
