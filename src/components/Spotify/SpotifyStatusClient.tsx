'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMostRecentTrack } from '@/src/services/spotify/spotifyAPI';
import SpotifyStatusView from './SpotifyStatusView';

export default function WebsiteStatusClient() {
  // Client-side logic: Fetch commits
  const { data, isLoading, isError } = useQuery({
    queryKey: ['currentlyPlaying'],
    queryFn: getMostRecentTrack,
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
