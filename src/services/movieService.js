import http from './httpService';
import { apiUrl } from '../config.json';

const api = apiUrl + 'movies';

function movieUrl(id) {
    return `${api}/${id} `
}

export function getMovies() {
    return http.get(api)
}

export function getMovie(movieId) {
    return http.get(movieUrl(movieId))
}

export function saveMovie(movie) {
    if(movie._id) {
        const body = {...movie};
        delete body._id;
        return http.put(movieUrl(movie._id), body)
    }

    return http.post(api, movie)
}

export function deleteMovies(movieId) {
    return http.delete(movieUrl(movieId))
}