import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faTwitter,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link';

const socialMedia = [
  {
    title: 'Github',
    link: 'https://github.com/NealMatta',
    icon: faGithub,
  },

  {
    title: 'Twitter',
    link: 'https://twitter.com/NealMatta',
    icon: faTwitter,
  },
  {
    title: 'LinkedIn',
    link: 'https://www.linkedin.com/in/nealmatta/',
    icon: faLinkedin,
  },
  {
    title: 'Resume',
    link: '#',
    icon: faFile,
  },
];

export default function SocialLinks() {
  return (
    <div className="flex space-x-2">
      {socialMedia.map(({ title, link, icon }) => {
        return (
          <Link
            key={title}
            title={title}
            href={link}
            target="_blank"
            className="group relative flex h-8 w-8 items-center justify-center rounded-lg border border-foreground hover:border-primary"
          >
            <FontAwesomeIcon
              icon={icon}
              size="lg"
              className="w-4 shrink-0 group-hover:text-primary"
            />
          </Link>
        );
      })}
    </div>
  );
}
