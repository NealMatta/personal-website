import SocialMediaList from '../IntroComponents/SocialMediaList';

export default function Intro() {
	return (
		<div className="text-slate-700 flex-1">
			<h1 className="text-2xl font-bold">Hi, I'm Neal Matta</h1>
			<p>
				I'm a constant student always looking to learn more. From 9 - 5,
				I work as an Enterprise Architect to help sell{' '}
				<a
					className="text-sky-700 hover:underline"
					href="https://www.workday.com/"
					target="blank"
				>
					Workday
				</a>
				. Outside of those hours, I love to{' '}
				<a
					className="text-sky-700 hover:underline"
					href="https://www.goodreads.com/user/show/98169338-neal-matta"
				>
					read
				</a>
				, play volleyball, and pick up new hobbies. I'm currently
				learning React to help me build my dreams
			</p>
			<br />
			<p>
				If you have book recommendations or just want to chat, reach out
			</p>
			<SocialMediaList />
		</div>
	);
}
