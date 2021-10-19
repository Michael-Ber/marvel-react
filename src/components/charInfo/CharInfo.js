import './charInfo.scss';
import abyss from '../../resourses/img/abyss.jpg';

const CharInfo = () => {
    return (
        <div className="char-content__info">
            <div className="char-content__info-person">
                <div className="char-content__info-person-img">
                    <img src={abyss} alt="character"/>
                </div>
                <div className="char-content__info-person-btns">
                    <span>Abyss</span>
                    <button className="char-content__info-person-btn btn btn-main">homepage</button>
                    <button className="char-content__info-person-btn btn btn-sec">wiki</button>
                </div>
            </div>
            <div className="char-content__info-descr">
                <article>
                    In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.
                </article>
            </div>
            <ul className="char-content__info-comicses"><strong>Comics:</strong>
                <li className="char-content__info-comics">
                    <a href="#" className="char-content__info-comics-link">
                        All-Winners Squad: Band of Heroes (2011) #3
                    </a>
                </li>
                <li className="char-content__info-comics">
                    <a href="#" className="char-content__info-comics-link">
                        Alpha Flight (1983) #50
                    </a>
                </li>
                <li className="char-content__info-comics">
                    <a href="#" className="char-content__info-comics-link">
                        Amazing Spider-Man (1999) #503
                    </a>
                </li>
                <li className="char-content__info-comics">
                    <a href="#" className="char-content__info-comics-link">
                        Amazing Spider-Man (1999) #504
                    </a>
                </li>
                <li className="char-content__info-comics">
                    <a href="#" className="char-content__info-comics-link">
                        AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
                    </a>
                </li>
                <li className="char-content__info-comics">
                    <a href="#" className="char-content__info-comics-link">
                        Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
                    </a>
                </li>
                <li className="char-content__info-comics">
                    <a href="#" className="char-content__info-comics-link">
                        Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
                    </a>
                </li>
                <li className="char-content__info-comics">
                    <a href="#" className="char-content__info-comics-link">
                        Vengeance (2011) #4
                    </a>
                </li>
                <li className="char-content__info-comics">
                    <a href="#" className="char-content__info-comics-link">
                        Avengers (1963) #1
                    </a>
                </li>
                <li className="char-content__info-comics">
                    <a href="#" className="char-content__info-comics-link">
                        Avengers (1996) #1
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default CharInfo;