// js/api.js

const API_KEY = '6b2dec73b6697866a50cdaef60ccffcb'; // Replace with your actual TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const POSTER_SIZE = 'w342'; // Choose appropriate size: w92, w154, w185, w342, w500, w780, original

export const getPopularMovies = async (page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching popular movies:", error);
        return null;
    }
};

export const searchMovies = async (query, page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error searching movies:", error);
        return null;
    }
};

export const getMoviePosterUrl = (path) => {
    return path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${path}` : '';
};
