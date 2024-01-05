import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faGithub,
	faTwitter,
	faTiktok,
	faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const socialMedia = [
	{
		title: 'Github',
		link: 'https://github.com/NealMatta',
		icon: faGithub,
	},
	{
		title: 'Email',
		link: 'mailto:nealsmatta@gmail.com',
		icon: faEnvelope,
	},
	{
		title: 'Twitter',
		link: 'https://twitter.com/NealMatta',
		icon: faTwitter,
	},
	{
		title: 'TikTok',
		link: 'https://www.tiktok.com/@nealmattata?lang=en',
		icon: faTiktok,
	},
	{
		title: 'LinkedIn',
		link: 'https://www.linkedin.com/in/nealmatta/',
		icon: faLinkedin,
	},
];

export default function SocialMediaList() {
	return (
		<div class="text-right pt-3">
			<div class="mb-2 text-sm font-bold uppercase">Find me at</div>
			<div class="flex justify-end space-x-2">
				{socialMedia.map((single) => {
					return (
						<a
							key={single.title}
							title={single.title}
							href={single.link}
							target="_blank"
							className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-gray-30 transition-colors hover:border-green-400 active:top-[1px] dark:border-gray-500 dark:hover:border-gray-200"
						>
							<FontAwesomeIcon
								icon={single.icon}
								size="lg"
								className="w-5 flex-shrink-0 text-gray-40 transition-all group-hover:text-gray-800 dark:text-gray-50 dark:group-hover:text-green-400"
							/>
						</a>
					);
				})}
			</div>
		</div>
	);
}
