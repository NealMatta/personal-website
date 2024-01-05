// Returns a consistent header per section and adds padding to the bottom as well

export default function Section({ children, title }) {
	return (
		<section className="container">
			<h1 className="text-4xl text-slate-900 font-primary font-bold pb-3">
				{title}
			</h1>
			<div className="mb-10">{children}</div>
		</section>
	);
}
