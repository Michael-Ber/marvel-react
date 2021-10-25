class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=88ec8e24137e7ae9b256b6390181f68b';

    getResource = async (url) => {
        let res = await fetch(url);
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async (offset = 210) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformChar);
    }

    getCharacter = async(id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformChar(res.data.results[0]);
    }

    _transformChar = (char) => {
        return {
            name: char.name,
            description: char.description ? char.description.slice(0, 130) + '...': 'Sorry, there is no description :(',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            urlHome: char.urls[0].url,
            urlWiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items.length >= 10 ? char.comics.items.slice(0, 10): char.comics.items.length < 1 ? ['This character is not participated in comics']: char.comics.items
        }
    }
}

export default MarvelService;