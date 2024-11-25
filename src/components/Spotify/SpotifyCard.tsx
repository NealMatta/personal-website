import BarebonesCard from '../cards/BarebonesCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

export default function SpotifyCard() {
  return (
    <BarebonesCard
      title={
        <div className="flex items-center">
          <FontAwesomeIcon icon={faSpotify} className="mr-2 fa-icon" />
          <h2>Last Listened To</h2>
        </div>
      }
    >
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
    </BarebonesCard>
  );
}
