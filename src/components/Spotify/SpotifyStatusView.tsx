import React from 'react';
import BarebonesCard from '../cards/BarebonesCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { SpotifyOutput } from '@/src/types/spotify';
import Image from 'next/image';

type SpotifyStatusViewProps = {
  isLoading: boolean;
  isError: boolean;
  recentSong: SpotifyOutput;
};

export default function SpotifyStatusView({
  isLoading,
  isError,
  recentSong,
}: SpotifyStatusViewProps) {
  return (
    <BarebonesCard
      title={
        <div className="flex items-center">
          <FontAwesomeIcon icon={faSpotify} className="mr-2 fa-icon" />
          {isLoading && (
            <>
              <div className="w-full flex items-center text-center">
                <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>{' '}
              </div>
            </>
          )}
          {!isLoading && (
            <h2>{recentSong?.lastPlayed || 'Last Listened To'}</h2>
          )}
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="text-center">
          {isLoading && (
            <div className="flex gap-2 items-center animate-pulse">
              {/* Left Side: Placeholder Icon */}
              <div className="w-full flex justify-center">
                <div className="relative flex items-center justify-center w-24 h-24 rounded-lg bg-gray-200"></div>
              </div>

              {/* Right Side: Placeholder Song and Artist */}
              <div className="w-full flex flex-col justify-center items-center text-center">
                <div className="h-6 w-32 bg-gray-200 rounded mb-2"></div>{' '}
                {/* Placeholder for Song */}
                <div className="h-4 w-24 bg-gray-200 rounded"></div>{' '}
                {/* Placeholder for Artist */}
              </div>
            </div>
          )}

          {isError && (
            <p className="text-red-500">Failed to load recent song.</p>
          )}

          {!isLoading && !isError && (
            <>
              <div className="flex gap-2 items-center">
                {/* Left Side: Album Icon */}
                <div className="w-full flex justify-center">
                  <div className="relative flex items-center justify-center w-24 h-24 rounded-lg overflow-hidden">
                    <Image
                      src={recentSong?.albumCover}
                      layout="fill"
                      objectFit="cover"
                      alt="Album Cover"
                    />
                  </div>
                </div>

                {/* Right Side: Song and Artist */}
                <div className="w-full flex flex-col justify-center items-center text-center">
                  <div className="text-2xl font-bold">
                    {recentSong?.songName || 'Unknown Song'}
                  </div>
                  <div className="text-md text-gray-500">
                    {recentSong?.artist || 'Unknown Artist'}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </BarebonesCard>
  );
}
