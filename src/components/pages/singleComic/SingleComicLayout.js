import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './singleComic.scss';


const SingleComicLayout = ({item}) => {
    const {title, image, description, price, pages, lang} = item;
    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comics book`}
                    />
                <title>{title}</title>
            </Helmet>
            <div className="single-comic__img">
                <img src={image} alt={title}/>
            </div>
            <div className="single-comic__descr">
                <div className="single-comic__descr-name">
                    <span>{title}</span>
                </div>
                <div className="single-comic__descr-text">
                    <article>{description}</article>
                </div>
                <div className="single-comic__descr-pagenum">
                    <span>{pages} pages</span>
                </div>
                <div className="single-comic__descr-lang">
                    <span>Language: {lang}</span>
                </div>
                <div className="single-comic__descr-cost">
                    <span>{price}$</span>
                </div>
            </div>
            <Link to="/comics" className="single-comic__btn">Back to all</Link>
        </div>
    )
}


export default SingleComicLayout;