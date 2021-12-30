import React, {useState, useEffect} from 'react';
import './randomChar.scss';
import useMarvelService from '../../services/MarvelService';
import mjolnir from '../../resourses/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const RandomChar = () => {
    const [char, setChar] = useState(null);

    const {getCharacter, process, setProcess} = useMarvelService();
    const setContent = (process, Component, data) => {
        switch(process) {
            case 'waiting': 
                return <Spinner />;
            case 'loading':
                return <div className="random__spinner"><Spinner /></div>;
            case 'confirmed':
                return <Component data={data} />;
            case 'error':
                return <div className="random__error"><ErrorMessage /></div>
            default:
                throw new Error('Unexpected process state');
        }
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(res => {
                onCharLoaded(res);
            })
            .then(() => setProcess('confirmed'))
    }
    const onChangeChar = () => {
        updateChar();
    }
    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 52000);
        return function clean() {clearInterval(timerId)};
    }, [])
    
    return (
        <div className="random">
            {setContent(process, View, char)}
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

const View = ({data}) => {
    if(!data) {
        return null;
    }
    const {name, description, thumbnail, urlHome, urlWiki} = data;
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