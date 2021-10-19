import './singleComic.scss';

const SingleComic = () => {
    return (
        <div className="single-comic">
            <div className="single-comic__img">
                <img src="./img/x-men.png" alt="xmen"/>
            </div>
            <div className="single-comic__descr">
                <div className="single-comic__descr-name">
                    <span>X-Men: Days of Future Past</span>
                </div>
                <div className="single-comic__descr-text">
                    <article>Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?</article>
                </div>
                <div className="single-comic__descr-pagenum">
                    <span>144 pages</span>
                </div>
                <div className="single-comic__descr-lang">
                    <span>Language: en-us</span>
                </div>
                <div className="single-comic__descr-cost">
                    <span>9.99$</span>
                </div>
            </div>
            <button className="single-comic__btn">Back to all</button>
        </div>
    )
}

export default SingleComic;