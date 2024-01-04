export default function Section({ children, title }) {
	return (
		<section>
			<h1 className="text-4xl">{title}</h1>
			<div className="flex flex-wrap gap-4 justify-stretch mb-10">
				{children}
			</div>
		</section>
	);
}
