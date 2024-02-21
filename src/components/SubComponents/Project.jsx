import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function Project({ project }) {
	return (
		<div className="p-3 flex flex-row min-h-full justify-around">
			<div className="flex-col">
				<div className="pb-3">
					<h1 className="text-2xl font-bold">{project.title}</h1>
					<p>{project.shortDescription}</p>
				</div>

				<div>
					<div className="flex flex-row gap-2">
						<span class="bg-blue-100 text-blue-800 text-sm px-2.5 py-0.5 rounded-full">
							{project.status}
						</span>
						<span class="bg-blue-100 text-blue-800 text-sm px-2.5 py-0.5 rounded-full">{project.type}</span>
					</div>
					{/* <div className="flex justify-end">
					<a href={project.link} className="text-sky-700 hover:underline">
						See More
					</a>
				</div> */}
				</div>
			</div>
			<div className="flex flex-col justify-center content-center">
				<FontAwesomeIcon icon={faChevronRight} size="lg" />
			</div>
		</div>
	);
}
