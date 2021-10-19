import React from 'react';
import './randomChar.scss';
import MarvelService from '../../services/MarvelService';
import mjolnir from '../../resourses/img/mjolnir.png';

class RandomChar extends React.Component {

    componentDidMount () {
        this.updateChar();
    }

    state = {
        char: {}
    };

    marvelService = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({char})
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        // const id = 1011482;
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            
    }

    render() {
        const {char: {name, description, thumbnail, urlHome, urlWiki}} = this.state;
        return (
            <div className="random">
                <div className="random__char">
                    <div className="random__char-img">
                        <img src={thumbnail} alt={name}/>
                    </div>
                    <div className="random__char-descr">
                        <h2 className="random__char-name">{name}</h2>
                        <span className="random__char-text">{description}</span>
                        <div className="random__char-btns">
                            <a href={urlHome} className="random__char-btn btn-main btn">homepage</a>
                            <a href={urlWiki} className="random__char-btn btn-sec btn">wiki</a>
                        </div>
                    </div>
                </div>
                <div className="random__select">
                    <span className="random__select-str">Random character for today</span>
                    <span className="random__select-str">Do you want to get to know him better?</span>
                    <span className="random__select-str">Or choose another one</span>
                    <a href="#" className="random__select-btn btn btn-main">try it</a>
                    <img src={mjolnir} alt="random logo"/>
                </div>
            </div>
        )
    }
}

export default RandomChar;