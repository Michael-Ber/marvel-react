import { useParams, Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './singleComic.scss';
import AppBanner from '../appBanner/AppBanner';


const SingleComic = () => {
    const [comic, setComic] = useState();
    const par = useParams();
    const {loading, error, getComic} = useMarvelService();
    console.log(Object.values(par)[0]);
    useEffect(() => {
        getComic(par.comicId)
            .then(setComic)
    }, [])
    const content = !error ?<><AppBanner/> <View comic={comic} /></> : null;
    const loadingMessage = loading ? <div style={{'textAlign': 'center'}}><Spinner /></div>: null;
    const errorMessage = error ? <ErrorMessage />: null;
    return (
        <>
            {loadingMessage}
            {errorMessage}
            {content}
        </>
    )
}

const View = ({comic}) => {
    if(!comic) {return <></>} 
    const {title, image, description, price, pages, lang} = comic;
    return (
        <div className="single-comic">
            <div className="single-comic__img">
                <img src={image} alt={title}/>
            </div>
            <div className="single-comic__descr">
                <div className="single-comic__descr-name">
                    <span>{title}</span>
                </div>
                <div className="single-comic__descr-text">
                    <article>{description}</article>
                </div>
                <div className="single-comic__descr-pagenum">
                    <span>{pages} pages</span>
                </div>
                <div className="single-comic__descr-lang">
                    <span>Language: {lang}</span>
                </div>
                <div className="single-comic__descr-cost">
                    <span>{price}$</span>
                </div>
            </div>
            <Link to="/comics" className="single-comic__btn">Back to all</Link>
        </div>
    )
}

export default SingleComic;