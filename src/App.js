// import './App.css';
// COMPONENTS
import Section from './components/Section';
import Navbar from './components/Navbar';
import Module from './components/Module';
// Modules
import Intro from './components/Modules/Intro';
import Spotify from './components/Modules/Spotify';
import Projects from './components/SubComponents/Projects';

function App() {
	return (
		<div className="container mx-auto max-w-4xl">
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
						<Module>Second Links</Module>
					</section>
				</section>
			</Section>
			<Section title={'Projects'}>
				<section className="grid gap-4 md:grid-cols-2 grid-cols-1 ">
					<Module>
						<Projects />
					</Module>
					<Module>
						<Projects />
					</Module>
					<Module>
						<Projects />
					</Module>
				</section>
			</Section>
			<Section title={'Work'}></Section>
		</div>
	);
}

export default App;
