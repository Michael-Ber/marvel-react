import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

const SinglePage = ({Component, dataType}) => {
    const {getCharacter, getComic, clearError, process, setProcess} = useMarvelService();
    const [item, setItem] = useState();
    const {id} = useParams();
    useEffect(() => {
        updateData();
    }, [id])
    const updateData = () => {
        clearError();
        switch(dataType) {
            case 'char' : getCharacter(id).then(setItem).then(setProcess('confirmed')); break;
            case 'comic': getComic(id).then(setItem).then(setProcess('confirmed')); break;
            default: return null
        }
    }
    
    return (
        <>
            {setContent(process, Component, item)}
        </>
    )
    
}
export default SinglePage;