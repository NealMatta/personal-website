'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import SpotifyStatusView from './SpotifyStatusView';

async function fetchRecentSong() {
  const response = await fetch('/api/spotify/recentSong');
  if (!response.ok) {
    throw new Error('Failed to fetch recent song');
  }
  return response.json();
}

export default function SpotifyStatusClient() {
  // Client-side logic: Fetch data from the API
  const { data, isLoading, isError } = useQuery({
    queryKey: ['currentlyPlaying'],
    queryFn: fetchRecentSong,
  });

  // Pass all data and states to the presentational component
  return (
    <SpotifyStatusView
      isLoading={isLoading}
      isError={isError}
      recentSong={data}
    />
  );
}
