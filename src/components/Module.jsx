// Gives me the rounded border box around

export default function Module({ children }) {
	const moduleClasses = 'box-border border-2 border-sky-200 rounded-lg';

	return <div className={moduleClasses}>{children}</div>;
}
