import React from 'react';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import './app.scss';

class App extends React.Component {
	state = {
		selectedChar: null
	};

	onSelectChar = (id) => {
		this.setState({selectedChar: id})
	}
	render() {
		return (
			<div className="app">
				<div className = "main-page">
					<AppHeader />
					<RandomChar />
					<div className = "char-wrapper">
						<CharList onSelectChar={this.onSelectChar}/>
						<CharInfo charId={this.state.selectedChar}/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
