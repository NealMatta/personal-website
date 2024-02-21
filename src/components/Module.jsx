// Gives me the rounded border box around

export default function Module({ children, className }) {
	const moduleClasses = `box-border border-2 border-sky-600 rounded-sm ${className}`;

	return <div className={moduleClasses}>{children}</div>;
}
