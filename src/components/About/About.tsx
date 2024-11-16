import BasicCard from '../card/BasicCard';
import SocialLinks from './SocialLinks';
// import Image from 'next/image';

export default function About() {
  return (
    <BasicCard>
      <div className="flex gap-2">
        <div className="w-1/4 bg-red-600">
          <div className="flex h-full items-center justify-center ">
            <p>Image Placehold</p>
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
        <div className="w-3/4">
          <div className="flex flex-col">
            <div className="flex gap-4 items-center ">
              <h1 className="font-bold text-3xl">About Me </h1>
              <SocialLinks />
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              vel arcu sit amet ipsum tincidunt mollis quis sed enim. Vivamus
              vitae dapibus massa. Aenean laoreet ac velit a lacinia. Aliquam
              malesuada arcu lacus, id dignissim eros tempus ut. Cras mattis
              sollicitudin diam, sit amet eleifend justo egestas
            </div>
          </div>
        </div>
      </div>
    </BasicCard>
  );
}
