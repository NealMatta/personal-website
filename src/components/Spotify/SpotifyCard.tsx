import BarebonesCard from '../cards/BarebonesCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

export default function SpotifyCard() {
  return (
    <BarebonesCard>
      <div className="flex items-center h-full mb-2">
        <FontAwesomeIcon icon={faSpotify} />
        <h2 className="font-bold ml-2">Last Listened To</h2>
      </div>
      <div className="flex gap-2 items-center">
        {/* Left Side: Square Icon */}
        <div className="w-full flex justify-center">
          <div className="relative flex items-center justify-center w-24 h-24 rounded-lg bg-gray-300">
            <FontAwesomeIcon
              icon={faSpotify}
              className="text-4xl text-gray-700"
            />
          </div>
        </div>

        {/* Right Side: Song and Artist */}
        <div className="w-full flex flex-col justify-center items-center text-center">
          <div className="text-xl font-bold">Song</div>
          <div className="text-sm text-gray-500">Artist</div>
        </div>
      </div>
    </BarebonesCard>
  );
}
