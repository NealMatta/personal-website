export default function Section({ children, title }) {
	return (
		<section className="container">
			<h1 className="text-4xl text-slate-900">{title}</h1>
			<div className="flex gap-4 mb-10">{children}</div>
		</section>
	);
}
