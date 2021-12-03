import { useHttp } from "../hooks/http.hook";


const useMarvelService = () => {
    const {loading, request, error} = useHttp();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=88ec8e24137e7ae9b256b6390181f68b';


    const getAllCharacters = async (offset = 210) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformChar);
    }

    const getCharacter = async(id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformChar(res.data.results[0]);
    }

    const getAllComicses = async(offset = 10) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const _transformComics = (comics) => {
        return {
            title: comics.title,
            image: comics.images.length > 0 ? comics.images[0].path + '.' + comics.images[0].extension: null,
            url: comics.urls[0].url,
            price: comics.prices[0].price,
            id: comics.id
        }
    }

    const _transformChar = (char) => {
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

    return {loading, error, getAllCharacters, getCharacter, getAllComicses}
}

export default useMarvelService;