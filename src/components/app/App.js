import React from 'react';
import ReactDOM  from 'react-dom';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import PropTypes from 'prop-types'; 
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
				<div className = "main-page" style={{'overflow': 'hidden', 'position': 'relative'}}>
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
					<Portal>
						<ExamplePortal />
					</Portal>
				</div>
				
			</div>
		);
	}
}

const Portal = (props) => {
	const node = document.createElement('div');
	document.body.append(node);
	return ReactDOM.createPortal(props.children, node);
}

class ExamplePortal extends React.Component {
	state = {
		open : false
	}

	handleModal = () => {
		this.setState(({open}) => ({
			open: !open
		}))
	}
	render() {
		const { open } = this.state;
		return (
			<>
				<button style={{'width': '100px', 'backgroundColor': 'green'}} onClick={this.handleModal}>Toggle modal</button>
				{open && <Modal />}
			</>
		)
	}
}
const Modal = () => {
	return (
		<div style={{'width': '200px', 'height': '100px', 'position': 'absolute', 'backgroundColor': '#fcc', 'textAlign': 'center', 'zIndex': '1000', 'bottom': '-5%', 'right': '30%'}}>
			This is modal window
		</div>
	)
}


App.propTypes = {
	onSelectChar: PropTypes.func
}
export default App;
