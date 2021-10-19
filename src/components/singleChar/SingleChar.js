import './singleChar.scss';

const SingleChar = () => {
    return (
        <div className="character">
            <div className="character__img">
                <img src="./img/abyss.jpg" alt="xmen"/>
            </div>
            <div className="character__descr">
                <div className="character__descr-name">
                    <span>ABYSS</span>
                </div>
                <div className="character__descr-text">
                    <article>In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.</article>
                </div>
            </div>
            <button className="character__btn">Back to all</button>
        </div>
    )
}

export default SingleChar;