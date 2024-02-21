export default function Project({ project }) {
	return (
		<div className="p-6 flex flex-col min-h-full justify-between">
			<div className="pb-6">
				<h1 className="text-3xl font-bold">{project.title}</h1>
				<p>{project.description}</p>
			</div>

			<div>
				<div className="flex flex-row gap-4">
					<span class="bg-blue-100 text-blue-800 text-sm px-2.5 py-0.5 rounded-full">{project.status}</span>
					<span class="bg-blue-100 text-blue-800 text-sm px-2.5 py-0.5 rounded-full">{project.type}</span>
				</div>
				<div className="flex justify-end">
					<a href={project.link} className="text-sky-700 hover:underline">
						See More
					</a>
				</div>
			</div>
		</div>
	);
}
