import React from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

class CharList extends React.Component {

    marvelService = new MarvelService();
    componentDidMount() {
        this.onUpdataChars();
    }
    state = {
        chars: [],
        loading: true,
        error: false
    };
    onUpdataChars = () => {
        this.onLoading();
        this.marvelService.getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onError)
    }
    onCharsLoaded = (chars) => {
        this.setState({chars, loading: false})
    }
    onLoading = () => {
        this.setState({loading: true});
    }
    onError = () => {
        this.setState({loading: false, error: true});
    }
    render() {
        const {chars, loading, error} = this.state;
        const loadingMessage = loading ? <div style={{gridRowStart: 2, gridColumnStart: 2,  justifySelf: 'center', alignSelf: 'center'}}> <Spinner /> </div> : null;
        const errorMessage = error ?<div style={{gridRowStart: 1, gridColumnStart: 2,   justifySelf: 'center', alignSelf: 'center'}}><ErrorMessage /></div> : null;
        const elems = !(loading || error) ? chars.map(item => {
            const {name, thumbnail, id} = item;
            let styleImgNotAvailable = {objectFit: 'cover'};
            if(thumbnail.slice(-23, -4) === 'image_not_available') {
                styleImgNotAvailable = {objectFit: 'contain'};
            }
            return (
                <li 
                    key={id} 
                    className="char-content__list-item"
                    onClick={() => this.props.onSelectChar(id)}>
                    <div className="char-content__list-item-img">
                        <img src={thumbnail} alt="character" style={styleImgNotAvailable}/>
                    </div>
                    <div className="char-content__list-item-name">
                        <span>{name}</span>
                    </div>
                </li>
            )
        }): null; 
        return (
            <div className="char-content">
                <ul className="char-content__list">
                    {loadingMessage}
                    {errorMessage}
                    {elems}
                    <button className="char-content-btn btn btn-main btn-long">Load more</button>
                </ul>
            </div>
        )
    }
}

export default CharList;