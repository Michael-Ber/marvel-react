import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './singleChar.scss';

const SingleCharLayout = ({item}) => {
    const {thumbnail, name, description} = item;
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