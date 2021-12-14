import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const [skeleton, setSkeleton] = useState(true);
    const {loading, error, getCharacter} = useMarvelService();

    const onLoading = () => {
        setSkeleton(false);
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setSkeleton(false);
    }

    const updateChar = (id) => {
        onLoading();
        getCharacter(id)
            .then(res => {
                onCharLoaded(res);
            })
    }
    useEffect(() => {
        if(!props.charId){
            setSkeleton(true);
            return;
        }
        updateChar(props.charId);
    }, [props.charId])
    const skeletonMessage = skeleton ? <Skeleton />: null;
    const loadingMessage = loading ? <Spinner />: null;
    const errorMessage = error ? <ErrorMessage />: null;
    const content = !(loading || error || skeleton) ? <View char={char}/>: null;
    return (
        <div className="char-content__info">
            {errorMessage}
            {loadingMessage}
            {skeletonMessage}
            {content}
        </div>
    )
}

const View = ({char}) => {
    if(!char) {
        return null;
    }
    const {name, thumbnail, urlHome, urlWiki, description, comics} = char;
    return (
        <>
            <div className="char-content__info-person">
                <div className="char-content__info-person-img">
                    <img src={thumbnail} alt={name}/>
                </div>
                <div className="char-content__info-person-btns">
                    <span>{name}</span>
                    <a href={urlHome} className="char-content__info-person-btn btn btn-main">homepage</a>
                    <a href={urlWiki} className="char-content__info-person-btn btn btn-sec">wiki</a>
                </div>
            </div>
            <div className="char-content__info-descr">
                <article>
                    {description}
                </article>
            </div>
            <ul className="char-content__info-comicses"><strong>Comics:</strong>
                {comics.map((item, i) => {
                    const reg = /\/\d+/g;
                    const uri = item.resourceURI.match(reg)[0].replace(/\//, '');
                    if(typeof(item) !== 'object') {
                        return item;
                    }
                    return (
                        <li key={i} className="char-content__info-comics">
                            <Link to={`/comics/${uri}`} className="char-content__info-comics-link">
                                {item.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default CharInfo;