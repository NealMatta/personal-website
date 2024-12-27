'use client';

import { useQuery } from '@tanstack/react-query';
import TrainAlertView from './TrainAlertView';

async function fetchCTAInfo() {
  const response = await fetch('/api/cta/chicagoRedLine');
  if (!response.ok) {
    throw new Error('Failed to fetch recent song');
  }

  return response.json();
}

export default function TrainAlertClient() {
  // Client-side logic: Fetch data from the API
  const { data, isLoading, isError } = useQuery({
    queryKey: ['ctaStatus'],
    queryFn: fetchCTAInfo,
    refetchInterval: 60 * 1000, // Automatically refetch every 60 seconds
    staleTime: 30 * 1000, // Data is considered fresh for 30 seconds
  });

  // Pass all data and states to the presentational component
  return (
    <TrainAlertView
      isLoading={isLoading}
      isError={isError}
      allTrainData={data}
    />
  );
}
