export default function Module({ children, extraClassNames = '' }) {
	return (
		<div
			className={`box-border p-4 border-2 rounded-lg border-slate-500 ${extraClassNames}`}
			// {...props}
		>
			{children}
		</div>
	);
}
