import React from 'react';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
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
					<ErrorBoundary>
						<RandomChar />
					</ErrorBoundary>
					<div className = "char-wrapper">
						<ErrorBoundary>
							<CharList onSelectChar={this.onSelectChar}/>
						</ErrorBoundary>
						<ErrorBoundary>
							<CharInfo charId={this.state.selectedChar}/>
						</ErrorBoundary>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
