import React from 'react';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charInfo.scss';

class CharInfo extends React.Component {
    state = {
        char: null,
        loading: false,
        error: false, 
        skeleton: true
    };

    marvelService = new MarvelService();

    onLoading = () => {
        this.setState({loading: true, skeleton: false});
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false, error: false, skeleton: false})
    }
    onError = () => {
        this.setState({loading: false, error: true})
    }

    updateChar = (id) => {
        this.onLoading();
        this.marvelService
            .getCharacter(id)
            .then(res => {
                this.onCharLoaded(res);
            })
            .catch(this.onError)
    }
    onChangeChar = () => {
        this.setState({error: false});
        this.updateChar();
    }
    
    componentDidMount () {
        
        if(!this.props.charId){
            this.setState({skeleton: true})
            return;
        }
        this.updateChar(this.props.charId);
    }
    componentDidUpdate(prevProps) {
        if(this.props.charId !== prevProps.charId) {
            this.updateChar(this.props.charId)
        }
    }
    render() {
        const {loading, error, skeleton} = this.state;
        const skeletonMessage = skeleton ? <Skeleton />: null;
        const loadingMessage = loading ? <Spinner />: null;
        const errorMessage = error ? <ErrorMessage />: null;
        const content = !(loading || error || skeleton) ? <View char={this.state.char}/>: null;
        return (
            <div className="char-content__info">
                {errorMessage}
                {loadingMessage}
                {skeletonMessage}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, thumbnail, urlHome, urlWiki, description, comics} = char;
    return (
        <>
            <div className="char-content__info-person">
                <div className="char-content__info-person-img">
                    <img src={thumbnail} alt={name}/>
                </div>
                <div className="char-content__info-person-btns">
                    <span>{name}</span>
                    <a href={urlHome} className="char-content__info-person-btn btn btn-main">homepage</a>
                    <a href={urlWiki} className="char-content__info-person-btn btn btn-sec">wiki</a>
                </div>
            </div>
            <div className="char-content__info-descr">
                <article>
                    {description}
                </article>
            </div>
            <ul className="char-content__info-comicses"><strong>Comics:</strong>
                {comics.map((item, i) => {
                    if(typeof(item) !== 'object') {
                        return item;
                    }
                    return (
                        <li key={i} className="char-content__info-comics">
                            <a href={item.resourceURI} className="char-content__info-comics-link">
                                {item.name}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default CharInfo;