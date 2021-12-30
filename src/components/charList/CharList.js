import React, {useState, useEffect, useRef, useMemo} from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './charList.scss';

const CharList = (props) => {
    const [chars, setChars] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [charsEnded, setCharsEnded] = useState(false);
    const [moreCounter, setMoreCounter] = useState(1530);
    const {getAllCharacters, process, setProcess} = useMarvelService();

    const setContent = (process, Component, loadingMore) => {
        switch(process) {
            case 'waiting':
                return <Spinner />
            case 'loading':
                return !loadingMore ? <Spinner />: <Component />;
            case 'confirmed':
                return <Component />;
            case 'error':
                return <ErrorMessage />
            default:
                throw new Error('Unexpected process state');
        }
    }

    useEffect(() => {
        onUpdateChars();
    }, [])

    const onUpdateChars = () => {
        getAllCharacters()
            .then(onCharsLoaded)
            // .then(() => setProcess('confirmed'))
    }
    const onCharsLoaded = (chars) => {
        setChars(chars);
        setProcess('confirmed');
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
    const refOnItem = useRef([]);
    const setActiveClass = (n) => {
        refOnItem.current.forEach(item => {
            item.classList.remove('char-content__list-item-selected');
        })
        refOnItem.current[n].classList.add('char-content__list-item-selected');
        refOnItem.current[n].focus();
    }
    
    const elems = chars.map((item, n) => {
        const {name, thumbnail, id} = item;
        let styleImgNotAvailable = {objectFit: 'cover'};
        if(thumbnail.slice(-23, -4) === 'image_not_available') {
            styleImgNotAvailable = {objectFit: 'contain'};
        }
        return (
            <CSSTransition key={id} timeout={1500} classNames="char-content__list-item">
                <li 
                    tabIndex = {0}
                    ref = {el => refOnItem.current[n] = el}
                    className="char-content__list-item"
                    onFocus={() => {props.onSelectChar(id); setActiveClass(n)}}>
                        <div 
                            className="char-content__list-item-img">
                            <img src={thumbnail} alt="character" style={styleImgNotAvailable}/>
                        </div>
                        <div className="char-content__list-item-name">
                            <span>{name}</span>
                        </div>
                </li>
            </CSSTransition>
            
        )
    }); 
    console.log(process);
    const content = useMemo(() => {return setContent(process, () => {return elems}, loadingMore)}, [process, chars]);
    const spinnerInsteadBtn = loadingMore ? <div style={{marginTop: '45px'}}><Spinner /></div>: null;
    return (
        <div className="char-content">
            <ul className="char-content__list">
                <TransitionGroup component={null}>
                    {content}
                </TransitionGroup>
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