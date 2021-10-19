import './app.scss';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';

function App() {
	return (
	<div className="app">
		<div className = "main-page">
			<AppHeader />
			<RandomChar />
			<div className = "char-wrapper">
				<CharList />
				<CharInfo />
			</div>
		</div>
	</div>
	);
}

export default App;
