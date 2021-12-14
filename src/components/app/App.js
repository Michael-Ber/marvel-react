import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AppHeader from '../appHeader/AppHeader';
import SingleComic from '../singleComic/SingleComic';
import Spinner from '../spinner/Spinner';
import PropTypes from 'prop-types'; 
import './app.scss';

const MainPage = lazy(() => import ('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const ErrorPage = lazy(() => import('../pages/ErrorPage'));

const App = () => {
	
	return (
		<Router>
			<div className="app">
				<div className = "main-page" style={{'position': 'relative'}}>
					<AppHeader />
					<Suspense fallback={<Spinner />}>
						<Routes>
							<Route path="/" exact element={<MainPage/>}/>
							<Route path = "/comics" exact element={<ComicsPage/>}/>
							<Route path = "/comics/:comicId" exact element={<SingleComic/>}/>
							<Route path="*" element={<ErrorPage/>}/>
						</Routes>
					</Suspense>
				</div>
			</div>
		</Router>
	);
}
App.propTypes = {
	onSelectChar: PropTypes.func
}
export default App;
