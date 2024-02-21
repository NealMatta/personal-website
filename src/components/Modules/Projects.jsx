import projectsData from '../../utils/projectsData.json';
import Project from '../SubComponents/Project';
import Module from '../Module';

export default function Projects() {
	return (
		<div className="p-6 flex flex-col ">
			<h1 className="text-lg font-bold uppercase pb-4">Experiments</h1>
			{projectsData.map((project) => {
				return (
					<div className="pb-4">
						<Module className={'rounded-lg'}>
							<Project project={project} />
						</Module>
					</div>
				);
			})}
		</div>
		// <section className="grid gap-4 md:grid-cols-2 grid-cols-1">

		// </section>
	);
}
