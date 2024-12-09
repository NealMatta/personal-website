import React from 'react';
import BarebonesCard from '../cards/BarebonesCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

type SpotifyStatusViewProps = {
  isLoading: boolean;
  isError: boolean;
  recentSong: any;
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
          <h2>Last Listened To</h2>
        </div>
      }
    >
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
              {/* <p>{commitCount}</p> */}
              <div className="flex gap-2 items-center">
                {/* Left Side: Square Icon */}
                <div className="w-full flex justify-center">
                  <div className="relative flex items-center justify-center w-24 h-24 rounded-lg bg-gray-300">
                    <FontAwesomeIcon
                      icon={faSpotify}
                      className="text-4xl text-gray-700 fa-icon"
                    />
                  </div>
                </div>

                {/* Right Side: Song and Artist */}
                <div className="w-full flex flex-col justify-center items-center text-center">
                  <div className="text-2xl font-bold">Song</div>
                  <div className="text-md text-gray-500">Artist</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </BarebonesCard>
  );
}
