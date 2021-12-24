import { useParams, Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';

import './singleChar.scss';

const SingleChar = ({item}) => {
    const {thumbnail, name, description} = item;
    return (
        <div className="character">
            <div className="character__img">
                <img src={thumbnail} alt={name}/>
            </div>
            <div className="character__descr">
                <div className="character__descr-name">
                    <span>{name}</span>
                </div>
                <div className="character__descr-text">
                    <article>{description}</article>
                </div>
            </div>
            <Link to="/" className="character__btn">Back to all</Link>
        </div>
    )
}

// const View = ({char}) => {
//     if(!char) {return <></>} 
//     const {name, thumbnail, description} = char;
//     return (
//         <div className="character">
//             <div className="character__img">
//                 <img src={thumbnail} alt={name}/>
//             </div>
//             <div className="character__descr">
//                 <div className="character__descr-name">
//                     <span>{name}</span>
//                 </div>
//                 <div className="character__descr-text">
//                     <article>{description}</article>
//                 </div>
//             </div>
//             <Link to="/" className="character__btn">Back to all</Link>
//         </div>
//     )
// }

export default SingleChar;