import SocialMediaList from '../SubComponents/SocialMediaList';

export default function Intro() {
	return (
		<div className="m-6 text-slate-700 flex-1">
			<h1 className="text-2xl font-bold pb-1">Hi, I'm Neal Matta</h1>
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
				. Outside of those hours, I spend my time{' '}
				<a
					className="text-sky-700 hover:underline"
					href="https://www.goodreads.com/user/show/98169338-neal-matta"
				>
					reading
				</a>
				, playing volleyball, and picking up new hobbies.
			</p>
			<p className="py-3">
				I'm currently (re)learning React and building this website to
				help me practice. I'm focusing on proper react development
				practice and trying to learn more about how I can work with APIs
				as well
			</p>
			<p>
				If you have any feedback on the site, book recommendations, or
				just want to chat, please reach out!
			</p>
			<SocialMediaList />
		</div>
	);
}
