'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCommits } from '@/src/services/githubAPI';
import WebsiteStatusView from './WebsiteStatusView';

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
