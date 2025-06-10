// js/components/movieCard.js

import { getMoviePosterUrl } from '../api.js';

export const createMovieCard = (movie) => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const posterPath = movie.poster_path;
    const posterUrl = getMoviePosterUrl(posterPath);
    const title = movie.title || movie.name; // For movies and TV shows
    const releaseDate = movie.release_date || movie.first_air_date; // For movies and TV shows
    const voteAverage = movie.vote_average;

    movieCard.innerHTML = `
        <img src="${posterUrl}" alt="${title} Poster" class="movie-card-poster lazy-load" data-src="${posterUrl}" onerror="this.onerror=null;this.src='assets/placeholder.jpg';">
        <div class="movie-card-info">
            <h3 class="movie-card-title">${title}</h3>
            <p class="movie-card-release-date">${releaseDate ? new Date(releaseDate).getFullYear() : 'N/A'}</p>
            <p class="movie-card-rating">⭐ ${voteAverage ? voteAverage.toFixed(1) : 'N/A'}</p>
        </div>
    `;

    // Lazy load implementation
    const img = movieCard.querySelector('.movie-card-poster');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const imgElement = entry.target;
                imgElement.src = imgElement.dataset.src;
                imgElement.classList.remove('lazy-load');
                observer.unobserve(imgElement);
            }
        });
    });
    observer.observe(img);

    return movieCard;
};

