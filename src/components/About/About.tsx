import BarebonesCard from '../cards/BarebonesCard';
import SocialLinks from './SocialLinks';
// import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function About() {
  return (
    <BarebonesCard>
      <div className="flex flex-col md:flex-row gap-4 md:gap-2">
        <div className="w-full md:w-1/4 ">
          <div className="flex h-full items-center justify-center ">
            <div className="flex space-x-2">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-slate-500 bg-red-400 ">
                <FontAwesomeIcon icon={faUser} className="w-12" />
              </div>
              {/* <Image
            className=""
            src="/next.svg"
            alt="Next.js logo"
            width={50}
            height={50}
            priority
          /> */}
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <div className="flex flex-col">
            <div className="flex gap-4 items-center ">
              <h1 className="font-bold text-3xl">About Me </h1>
              <SocialLinks />
            </div>
            <div className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              vel arcu sit amet ipsum tincidunt mollis quis sed enim. Vivamus
              vitae dapibus massa. Aenean laoreet ac velit a lacinia. Aliquam
              malesuada arcu lacus, id dignissim eros tempus ut. Cras mattis
              sollicitudin diam, sit amet eleifend justo egestas
            </div>
          </div>
        </div>
      </div>
    </BarebonesCard>
  );
}
