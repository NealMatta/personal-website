import classNames from 'classnames';

export default function Module({ children, extraClassNames }) {
	const divClasses = classNames(
		'box-border p-4 border-2 rounded-lg',
		extraClassNames
	);

	return <div className={divClasses}>{children}</div>;
}
