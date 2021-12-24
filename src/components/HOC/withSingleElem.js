import { useParams, Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';

const withSingleElem = (WrappedComponent, getData) => {
    return (props) => {
        const [item, setItem] = useState();
        const par = useParams();
        useEffect(() => {
            getData(Object.values(par)[0])
                .then(setItem)
        }, [])
        console.log(item);
        const content = !props.error ?<><AppBanner/><WrappedComponent item={item} /></>: null;
        const loadingMessage = props.loading ? <div style={{'textAlign': 'center'}}><Spinner /></div>: null;
        const errorMessage = props.error ? <ErrorMessage />: null;
        return (
            <>
                {loadingMessage}
                {errorMessage}
                {content}
            </>
        )
    }
}
export default withSingleElem;