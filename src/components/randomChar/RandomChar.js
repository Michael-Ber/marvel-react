import React from 'react';
import './randomChar.scss';
import MarvelService from '../../services/MarvelService';
import mjolnir from '../../resourses/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

class RandomChar extends React.Component {

    state = {
        char: {},
        loading: true,
        error: false
    };

    componentDidMount () {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 12000);
    }

    componentWillUnmount () {
        clearInterval(this.timerId);
    }

    marvelService = new MarvelService();

    onLoading = () => {
        this.setState({loading: true});
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false, error: false})
    }
    onError = () => {
        this.setState({loading: false, error: true})
    }

    updateChar = () => {
        this.onLoading();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        // const id = 4523;
        this.marvelService
            .getCharacter(id)
            .then(res => {
                this.onCharLoaded(res);
            })
            .catch(this.onError)
    }
    onChangeChar = () => {
        if(!this.state.error) {
            this.setState({loading: true});
        };
        this.updateChar();
    }

    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <div className="random__error"><ErrorMessage /></div>: null;
        const loadingMessage = loading ? <div className="random__spinner"><Spinner /></div>: null;
        const content = !(loading || error) ? <View char={char} />: null;
        return (
            <div className="random">
                {errorMessage}
                {loadingMessage}
                {content}
                <div className="random__select">
                    <span className="random__select-str">Random character for today</span>
                    <span className="random__select-str">Do you want to get to know him better?</span>
                    <span className="random__select-str">Or choose another one</span>
                    <button 
                        className="random__select-btn btn btn-main"
                        onClick={this.onChangeChar}>try it</button>
                    <img src={mjolnir} alt="random logo"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, urlHome, urlWiki} = char;
    return (
        <div className="random__char">
            <div className="random__char-img">
                <img src={thumbnail} alt='Random character'/>
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
    )
}


export default RandomChar;