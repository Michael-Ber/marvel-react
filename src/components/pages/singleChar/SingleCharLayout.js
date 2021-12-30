import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Spinner from '../../spinner/Spinner';

import './singleChar.scss';

const SingleCharLayout = ({data}) => {
    if(!data) {
        return <Spinner />;
    }
    const {thumbnail, name, description} = data;
    return (
        <div className="character">
            <Helmet>
                <meta
                    name="description"
                    content={`${name} character`}
                    />
                <title>{name}</title>
            </Helmet>
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

export default SingleCharLayout;