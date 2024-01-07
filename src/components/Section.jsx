// Returns a consistent header per section and adds padding to the bottom as well

export default function Section({ children, title, description }) {
	return (
		<section className="container">
			<div className="pb-3">
				<h1 className="text-4xl text-slate-900 font-primary font-bold">
					{title}
				</h1>
				<p className="italic text-slate-500">{description}</p>
			</div>
			<div className="mb-10">{children}</div>
		</section>
	);
}
