// Gives me the rounded border box around

export default function Module({ children, className }) {
	const moduleClasses = `${className} box-border border-2 border-sky-600`;

	return <div className={moduleClasses}>{children}</div>;
}
