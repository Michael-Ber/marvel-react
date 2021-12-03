import React, {useState, useEffect, useRef} from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

const CharList = (props) => {
    const [chars, setChars] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [charsEnded, setCharsEnded] = useState(false);
    const [moreCounter, setMoreCounter] = useState(1530);
    
    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onUpdateChars();
    }, [])

    const onUpdateChars = () => {
        getAllCharacters()
            .then(onCharsLoaded)
    }
    const onCharsLoaded = (chars) => {
        setChars(chars);
    }
    const onMoreCharsLoaded = (more) => {
        let ended = false;
        if(more.length < 9) {
            ended = true;
        }
        setChars(chars => ([...chars, ...more]))
        setCharsEnded(ended);
        setMoreCounter(moreCounter => moreCounter + 9)
    }
    const onLoadingMore = () => {
        setLoadingMore(true);
    }
    const onUpdateMore = (e) => {
        onLoadingMore();
        if(e) {
            e.target.style.display = 'none';
        }
        getAllCharacters(moreCounter)
            .then(onMoreCharsLoaded)
            .finally(() => {
                setLoadingMore(false);
                if(charsEnded && e) {
                    e.target.style.display = 'none';
                }else if(!charsEnded && e){
                    e.target.style.display = 'block'; 
                }
            })
    }
    let refOnItem = useRef([]);
    const setActiveClass = (n) => {
        refOnItem.current.forEach(item => {
            item.classList.remove('char-content__list-item-selected');
        })
        refOnItem.current[n].classList.add('char-content__list-item-selected');
        refOnItem.current[n].focus();
    }
    
    const loadingMessage = (loading && !loadingMore) ? <div style={{gridRowStart: 2, gridColumnStart: 2,  justifySelf: 'center', alignSelf: 'center'}}> <Spinner /> </div> : null;
    const errorMessage = error ?<div style={{gridRowStart: 1, gridColumnStart: 2,   justifySelf: 'center', alignSelf: 'center'}}><ErrorMessage /></div> : null;
    const elems = !(error) ? chars.map((item, n) => {
        const {name, thumbnail, id} = item;
        let styleImgNotAvailable = {objectFit: 'cover'};
        if(thumbnail.slice(-23, -4) === 'image_not_available') {
            styleImgNotAvailable = {objectFit: 'contain'};
        }
        return (
            <li 
                tabIndex = {0}
                ref = {el => refOnItem.current[n] = el}
                key={id} 
                className="char-content__list-item"
                onFocus={() => {props.onSelectChar(id); setActiveClass(n)}}>
                <div className="char-content__list-item-img">
                    <img src={thumbnail} alt="character" style={styleImgNotAvailable}/>
                </div>
                <div className="char-content__list-item-name">
                    <span>{name}</span>
                </div>
            </li>
        )
    }): null; 
    const spinnerInsteadBtn = loadingMore ? <div style={{marginTop: '45px'}}><Spinner /></div>: null;
    return (
        <div className="char-content">
            <ul className="char-content__list">
                {loadingMessage}
                {errorMessage}
                {elems}
            </ul>
            {spinnerInsteadBtn}
            <button 
                className="char-content-btn btn btn-main btn-long"
                onClick = {(e) => onUpdateMore(e)}
                disabled={loadingMore}>Load more
            </button>
        </div>
    )
    
}

export default CharList;