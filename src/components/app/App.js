import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import ComicsPage from '../pages/ComicsPage';
import AppHeader from '../appHeader/AppHeader';

import PropTypes from 'prop-types'; 
import './app.scss';

const App = () => {
	
	return (
		<Router>
			<div className="app">
				<div className = "main-page" style={{'position': 'relative'}}>
					<AppHeader />
					<Routes>
						<Route path="/" exact element={<MainPage/>}/>
						<Route path = "/comics" exact element={<ComicsPage/>}/>
					</Routes>
				</div>
			</div>
		</Router>
	);
}
App.propTypes = {
	onSelectChar: PropTypes.func
}
export default App;
