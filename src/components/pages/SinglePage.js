import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';
import useMarvelService from '../../services/MarvelService';

const SinglePage = ({Component, dataType}) => {
    const {loading, error, getCharacter, getComic, clearError} = useMarvelService();
    const [item, setItem] = useState();
    const {id} = useParams();
    useEffect(() => {
        updateData();
        console.log('effect');
    }, [id])
    const updateData = () => {
        clearError();
        switch(dataType) {
            case 'char' : getCharacter(id).then(setItem); break;
            case 'comic': getComic(id).then(setItem); break;
            default: return null
        }
    }
    
    const content = !(error || !item || loading) ?<><AppBanner/><Component item={item} /></>: null;
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
export default SinglePage;