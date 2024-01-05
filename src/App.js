// import './App.css';
// COMPONENTS
import Section from './components/Section';
import Navbar from './components/Navbar';
import Module from './components/Module';
// Modules
import Intro from './components/Modules/Intro';
import Spotify from './components/Modules/Spotify';

function App() {
	return (
		<div className="container mx-auto max-w-4xl">
			<Navbar />
			<Section title={'Intro'}>
				<Module>
					<Intro />
				</Module>
				{/* <Module
					extraClassNames={
						'bg-gradient-to-r from-[#191414] to-[#1DB954] '
					}
				>
					<Spotify />
				</Module> */}
				{/* <Module>Second Links</Module> */}
			</Section>
			<Section title={'Work'}></Section>
		</div>
	);
}

export default App;
