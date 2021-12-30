import {useState} from 'react';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import FindChar from '../findChar/FindChar';
import { Helmet } from 'react-helmet';

import bg from '../../resourses/img/vision.png';

const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null);

	const onSelectChar = (id) => {
		setSelectedChar(id)
	}
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                    />
                <title>Marvel Information Portal</title>
            </Helmet>
            <img src={bg} alt="vision" className = "main-page-img" />
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className = "char-wrapper">
                <ErrorBoundary>
                    <CharList onSelectChar={onSelectChar}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId={selectedChar}/>
                </ErrorBoundary>
            </div>
            <FindChar />
        </>
    )
}
export default MainPage;