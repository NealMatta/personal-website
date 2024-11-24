import BarebonesCard from '../cards/BarebonesCard';
import SocialLinks from './SocialLinks';
// import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function About() {
  return (
    <BarebonesCard>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Photo */}
        <div className="col-span-1 flex items-center justify-center">
          <div className="relative flex h-32 w-32 items-center justify-center rounded border-4 border-slate-500 bg-red-400">
            <FontAwesomeIcon icon={faUser} className="text-5xl" />
          </div>
        </div>

        {/* Content */}
        <div className="col-span-1 md:col-span-3 flex flex-col">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <h1 className="font-bold text-4xl">About Me</h1>
            <SocialLinks />
          </div>
          <div className="text-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            vel arcu sit amet ipsum tincidunt mollis quis sed enim. Vivamus
            vitae dapibus massa. Aenean laoreet ac velit a lacinia. Aliquam
            malesuada arcu lacus, id dignissim eros tempus ut. Cras mattis
            sollicitudin diam, sit amet eleifend justo egestas.
          </div>
        </div>
      </div>
    </BarebonesCard>
  );
}
