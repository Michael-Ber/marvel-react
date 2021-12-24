import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AppHeader from '../appHeader/AppHeader';
import SingleComic from '../singleComic/SingleComic';
import Spinner from '../spinner/Spinner';
import PropTypes from 'prop-types'; 
import './app.scss';
import SingleChar from '../singleChar/SingleChar';
import withSingleElem from '../HOC/withSingleElem';
import useMarvelService from '../../services/MarvelService';

const MainPage = lazy(() => import ('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const ErrorPage = lazy(() => import('../pages/ErrorPage'));



const App = () => {
	const {getCharacter, getComic} = useMarvelService();
	const SingleCharPage = withSingleElem(SingleChar, getCharacter);
	return (
		<Router>
			<div className="app">
				<div className = "main-page" style={{'position': 'relative'}}>
					<AppHeader />
					<Suspense fallback={<Spinner />}>
						<Routes>
							<Route path="/" element={<MainPage />}/>
							<Route path="/characters"  element={<MainPage/>}/>
							<Route path="/characters/:charId" element={<SingleCharPage/>}/>
							<Route path = "/comics"  element={<ComicsPage/>}/>
							<Route path = "/comics/:comicId" element={<SingleComic/>}/>
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
