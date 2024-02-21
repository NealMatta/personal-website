// import './App.css';
// Data
import projectsData from './utils/projectsData.json';
// COMPONENTS
import Section from './components/Section';
import Navbar from './components/Navbar';
import Module from './components/Module';
// Modules
import Intro from './components/Modules/Intro';
import Spotify from './components/Modules/Spotify';
import Project from './components/SubComponents/Project';
import NextSteps from './components/Modules/NextSteps';

function App() {
	return (
		<div className="mx-auto px-6 max-w-5xl">
			<Navbar />

			<Section title={'Intro'}>
				<section className="grid grid-cols-1 gap-4">
					<Module>
						<Intro />
					</Module>
					<section className="grid grid-cols-2 gap-4">
						<Module>
							<Spotify />
						</Module>
						<Module>
							<NextSteps />
						</Module>
					</section>
				</section>
			</Section>
			<Section
				title={'Projects'}
				description={`Ideas that I've worked on in the past, am currently working on, or plan to work on in the future`}
			>
				<section className="grid gap-4 md:grid-cols-2 grid-cols-1">
					{projectsData.map((project) => {
						return (
							<Module>
								<Project project={project} />
							</Module>
						);
					})}
				</section>
			</Section>
			<Section title={'Work'}></Section>
		</div>
	);
}

export default App;
