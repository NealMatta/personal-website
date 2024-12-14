import BarebonesCard from '../cards/BarebonesCard';
import SocialLinks from './SocialLinks';
import Image from 'next/image';

export default function About() {
  return (
    <BarebonesCard>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Photo */}
        <div className="col-span-1 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <Image
              src="/images/profile-picture.jpg"
              alt="Profile Picture"
              width={128}
              height={128}
              quality={100}
              className="rounded border-4 border-slate-900"
            />
          </div>
        </div>

        {/* Content */}
        <div className="col-span-1 md:col-span-3 flex flex-col gap-2">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <h1 className="font-bold text-4xl">About Me</h1>
            <SocialLinks />
          </div>
          <div className="text-md">
            Hey, I&apos;m Neal! I&apos;m a tech enthusiast and serial hobbyist
            working as an Enterprise Architect at Workday. I thrive on solving
            problems, organizing chaos, and pushing my aging body to the limits
            by playing too much volleyball. Outside of work, I&apos;m an avid
            volleyball player, a (more recently) adventurous foodie, and someone
            who finds joy in learning and creating. The purpose of this site is
            to help me brush up on my coding skills and bring even more
            organization to my life. Enjoy!
          </div>
        </div>
      </div>
    </BarebonesCard>
  );
}
