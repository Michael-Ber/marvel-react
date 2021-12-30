import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import FindChar from '../findChar/FindChar';
import setContent from '../../utils/setContent';
import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const { getCharacter, process, setProcess, clearError} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = (id) => {
        clearError();
        getCharacter(id)
            .then(res => {
                onCharLoaded(res);
            })
            .then(() => setProcess('confirmed'));
             
    }
    useEffect(() => {
        if(!props.charId){
            return;
        }
        updateChar(props.charId);
    }, [props.charId])
    return (
        <>
            <div className="char-content__info">
                {setContent(process, View, char)}
            </div>
            <FindChar />
        </>
    )
}

const View = ({data}) => {
    if(!data) {
        return null;
    }
    const {name, thumbnail, urlHome, urlWiki, description, comics} = data;
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
                    {description.slice(0, 130) + '...'}
                </article>
            </div>
            <ul className="char-content__info-comicses"><strong>Comics:</strong>
                {typeof(comics[0]) !== 'string' ? comics.map((item, i) => {
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
                }): comics[0]}
            </ul>
        </>
    )
}

export default CharInfo;