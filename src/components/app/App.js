import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';
import PropTypes from 'prop-types'; 
import './app.scss';

const MainPage = lazy(() => import ('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const ErrorPage = lazy(() => import('../pages/ErrorPage'));
const SinglePage = lazy(() => import ('../pages/SinglePage'));
const SingleCharLayout = lazy(() => import ('../pages/singleChar/SingleCharLayout'));
const SingleComicLayout = lazy(() => import ('../pages/singleComic/SingleComicLayout'));

const App = () => {
	return (
		<Router>
			<div className="app">
				<div className = "main-page" style={{'position': 'relative'}}>
					<AppHeader />
					<Suspense fallback={<Spinner />}>
						<Routes>
							<Route path="/" element={<MainPage />}/>
							<Route path="/characters"  element={<MainPage/>}/>
							<Route path="/characters/:id" element={<SinglePage Component={SingleCharLayout} dataType={'char'}/>}/>
							<Route path = "/comics"  element={<ComicsPage/>}/>
							<Route path = "/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType={'comic'}/>}/>
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
