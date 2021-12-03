import React, {useState, useEffect} from 'react';
import './randomChar.scss';
import useMarvelService from '../../services/MarvelService';
import mjolnir from '../../resourses/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const RandomChar = () => {
    const [char, setChar] = useState(null);

    const {loading, error, getCharacter} = useMarvelService();
    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(res => {
                onCharLoaded(res);
            })
    }
    const onChangeChar = () => {
        updateChar();
    }
    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 52000);
        return function clean() {clearInterval(timerId)};
    }, [])
    
    const errorMessage = error ? <div className="random__error"><ErrorMessage /></div>: null;
    const loadingMessage = loading ? <div className="random__spinner"><Spinner /></div>: null;
    const content = !(loading || error)  ? <View char={char} />: null;
    return (
        <div className="random">
            {errorMessage}
            {loadingMessage}
            {content}
            <div className="random__select">
                <span className="random__select-str">Random character for today</span>
                <span className="random__select-str">Do you want to get to know him better?</span>
                <span className="random__select-str">Or choose another one</span>
                <button 
                    className="random__select-btn btn btn-main"
                    onClick={onChangeChar}>try it</button>
                <img src={mjolnir} alt="random logo"/>
            </div>
        </div>
    )
    
}

const View = ({char, loading}) => {
    if(!char) {
        return null;
    }
    const {name, description, thumbnail, urlHome, urlWiki} = char;
    const notAvailableImg = thumbnail.slice(-23, -4);
    let imgStyle = {objectFit: 'cover'};
    if(notAvailableImg === 'image_not_available') {
        imgStyle = {objectFit: 'contain'};
    }
    return (
        <div className="random__char">
            <div className="random__char-img">
                <img src={thumbnail} alt='Random character' style={imgStyle}/>
            </div>
            <div className="random__char-descr">
                <h2 className="random__char-name">{name}</h2>
                <span className="random__char-text">{description}</span>
                <div className="random__char-btns">
                    <a href={urlHome} className="random__char-btn btn-main btn">homepage</a>
                    <a href={urlWiki} className="random__char-btn btn-sec btn">wiki</a>
                </div>
            </div>
        </div>
    )
}


export default RandomChar;