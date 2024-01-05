import classNames from 'classnames';

export default function Module({ children, extraClassNames }) {
	const divClasses = classNames(
		'box-border p-6 border-2 border-sky-200 rounded-lg',
		extraClassNames
	);

	return <div className={divClasses}>{children}</div>;
}
