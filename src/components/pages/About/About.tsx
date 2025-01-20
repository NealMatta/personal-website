import BarebonesCard from '../../reusable/cards/BarebonesCard';
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
            <h1 className="font-bold text-4xl">I&lsquo;m Neal ...</h1>
            <SocialLinks />
          </div>
          <div className="text-md space-y-4">
            <p>
              ... a tech enthusiast, lifelong learner, and self-proclaimed
              serial hobbyist working as an Enterprise Architect at Workday. I
              thrive on turning chaos into clarity, solving complex problems,
              and occasionally pushing my body past its limits with (far too
              much) volleyball.
            </p>
            <p>
              When I&lsquo;m not diving into technology, you&lsquo;ll find me on
              the volleyball court, exploring new cuisines as an adventurous
              foodie, or bringing my latest creative ideas to life. This site is
              my space to sharpen my coding skills, share what I&lsquo;m
              learning, and build tools that bring even more structure to my
              world.
            </p>
            <p>
              If you&lsquo;re interested in connecting further, you can find my
              LinkedIn and resume via the social links above. Thanks for
              stopping by—enjoy exploring!
            </p>
          </div>
        </div>
      </div>
    </BarebonesCard>
  );
}
