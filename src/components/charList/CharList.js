import React from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

class CharList extends React.Component {
    refOnItem = [];
    marvelService = new MarvelService();
    componentDidMount() {
        this.onUpdateChars();
    }
    state = {
        chars: [],
        loading: true,
        error: false,
        loadingMore: false,
        charsEnded: false,
        moreCounter: 1530
    };
    onUpdateChars = () => {
        this.onLoading();
        this.marvelService.getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onError)
    }
    onCharsLoaded = (chars) => {
        this.setState({chars, loading: false})
    }
    onMoreCharsLoaded = (more) => {
        let ended = false;
        if(more.length < 9) {
            ended = true;
        }
        this.setState(({chars, moreCounter}) => {
            return {
                chars: [...chars, ...more],
                charsEnded: ended,
                moreCounter: moreCounter + 9
            }
        })
    }
    onLoading = () => {
        this.setState({loading: true});
    }
    onLoadingMore = () => {
        this.setState({loadingMore: true})
    }
    onError = () => {
        this.setState({loading: false, error: true});
    }
    onUpdateMore = (e) => {
        this.onLoadingMore();
        if(e) {
            e.target.style.display = 'none';
        }
        this.marvelService.getAllCharacters(this.state.moreCounter)
            .then(this.onMoreCharsLoaded)
            .catch(this.onError)
            .finally(() => {
                this.setState({loadingMore: false});
                if(this.state.charsEnded && e) {
                    e.target.style.display = 'none';
                }else if(!this.state.charsEnded && e){
                    e.target.style.display = 'block'; 
                }
            })
    }
    setInputRef = elem => {
        this.refOnItem.push(elem);
    }
    setActiveClass = (n) => {
        console.log(this.refOnItem, n);
        this.refOnItem.forEach(item => {
            item.classList.remove('char-content__list-item-selected');
        })
        this.refOnItem[n].classList.add('char-content__list-item-selected');
        this.refOnItem[n].focus();
    }
    render() {
        const {chars, loading, error, loadingMore} = this.state;
        const loadingMessage = loading ? <div style={{gridRowStart: 2, gridColumnStart: 2,  justifySelf: 'center', alignSelf: 'center'}}> <Spinner /> </div> : null;
        const errorMessage = error ?<div style={{gridRowStart: 1, gridColumnStart: 2,   justifySelf: 'center', alignSelf: 'center'}}><ErrorMessage /></div> : null;
        const elems = !(error) ? chars.map((item, n) => {
            const {name, thumbnail, id} = item;
            let styleImgNotAvailable = {objectFit: 'cover'};
            if(thumbnail.slice(-23, -4) === 'image_not_available') {
                styleImgNotAvailable = {objectFit: 'contain'};
            }
            return (
                <li 
                    tabIndex = {0}
                    ref = {this.setInputRef}
                    key={id} 
                    className="char-content__list-item"
                    onFocus={() => {this.props.onSelectChar(id); this.setActiveClass(n)}}>
                    <div className="char-content__list-item-img">
                        <img src={thumbnail} alt="character" style={styleImgNotAvailable}/>
                    </div>
                    <div className="char-content__list-item-name">
                        <span>{name}</span>
                    </div>
                </li>
            )
        }): null; 
        const spinnerInsteadBtn = loadingMore ? <div style={{marginTop: '45px'}}><Spinner /></div>: null;
        return (
            <div className="char-content">
                <ul className="char-content__list">
                    {loadingMessage}
                    {errorMessage}
                    {elems}
                </ul>
                {spinnerInsteadBtn}
                <button 
                    className="char-content-btn btn btn-main btn-long"
                    onClick = {(e) => this.onUpdateMore(e)}
                    disabled={this.state.loadingMore}>Load more
                </button>
            </div>
        )
    }
}

export default CharList;