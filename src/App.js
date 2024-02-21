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
import NextSteps from './components/Modules/NextSteps';
import Projects from './components/Modules/Projects';

function App() {
	return (
		<div className="mx-auto px-6 lg:max-w-5xl">
			<Navbar />
			<h1 className="lg:text-9xl text-5xl uppercase tracking-widest text-center font-bold py-5">Neal Matta</h1>

			<section className="grid grid-cols-3 grid-rows-3 gap-4 h-[396px] mb-4">
				<Module className={'col-span-2 row-span-3'}>
					<Intro />
				</Module>
				<Module className={'row-span-1 border-0'}>
					<Spotify />
				</Module>
				<Module className={'row-span-2 overflow-scroll'}>
					<NextSteps />
				</Module>
			</section>

			<section className="grid grid-cols-5 grid-rows-3 gap-4">
				<Module className={'col-span-2 row-span-2'}>
					<Projects />
				</Module>
			</section>

			{/* <Section
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
			</Section> */}
		</div>
	);
}

export default App;
