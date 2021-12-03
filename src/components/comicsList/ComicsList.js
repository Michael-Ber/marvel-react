import {useState, useEffect, useRef} from 'react';
import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import imgNotFound from '../../resourses/img/image-not-found.jpg';

const ComicsList = () => {
    const [comics, setComics] = useState(null);
    const [loadingMore, setLoadingMore] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [moreCounter, setMoreCounter] = useState(20);
    
    const {loading, error, getAllComicses} = useMarvelService();

    useEffect(() => {
        onUpdateComics();
    }, [])

    const onUpdateComics = () => {
        getAllComicses()
            .then(onComicsLoaded)
    }
    const onComicsLoaded = (comics) => {
        console.log(comics);
        setComics(comics);
    }
    const onMoreComicsLoaded = (more) => {
        let ended = false;
        if(more.length < 8) {
            ended = true;
        }
        setComics(comics => ([...comics, ...more]))
        setComicsEnded(ended);
        setMoreCounter(moreCounter => moreCounter + 8)
    }
    const onLoadingMore = () => {
        setLoadingMore(true);
    }
    const onUpdateMore = (e) => {
        onLoadingMore();
        if(e) {
            e.target.style.display = 'none';
        }
        getAllComicses(moreCounter)
            .then(onMoreComicsLoaded)
            .finally(() => {
                setLoadingMore(false);
                if(comicsEnded && e) {
                    e.target.style.display = 'none';
                }else if(!comicsEnded && e){
                    e.target.style.display = 'block'; 
                }
            })
    }
    const loadingMessage = (loading && !loadingMore) ? <Spinner/>: null;
    const errorMessage = error ? <ErrorMessage />: null;
    const elems = !(error || !comics) ? comics.map((item, i) => {
        const img = item.image ? item.image : imgNotFound; 
        const styleImgNotAvailable = item.image ? {objectFit: 'cover'}: {objectFit: 'contain'};
        const price = item.price > 0 ? `${item.price}$` : 'NOT AVAILABLE'; 
        return (
            <li key={item.id} className="comicses__item">
                <a href={item.url} className="comicses__item-link">
                    <div className="comicses__item-img">
                        <img src={img} alt={item.title} style={styleImgNotAvailable}/>
                    </div>
                    <div className="comicses__item-title">
                        <span>{item.title}</span>
                    </div>
                    <div className="comicses__item-cost">
                        <span>{price}</span>
                    </div>
                </a>
            </li>
        )
    }):null;
    const spinnerInsteadBtn = loadingMore ? <div style={{marginTop: '45px', textAlign: 'center'}}><Spinner /></div>: null;
    return (
        <>
            <ul className="comicses">
                {errorMessage}
                {loadingMessage}
                {elems}
            </ul>
            {spinnerInsteadBtn}
            <button 
                className="char-content-btn btn btn-main btn-long"
                onClick = {(e) => onUpdateMore(e)}
                disabled={loadingMore}>Load more
            </button>
        </>
    )
}

export default ComicsList