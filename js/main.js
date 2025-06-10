
// js/main.js

import { getPopularMovies, searchMovies } from './api.js';
import { createMovieCard } from './components/movieCard.js';
import { setupNavigation } from './components/navigation.js';
import { createPaginationControls } from './components/pagination.js';

const movieListContainer = document.getElementById('movie-list');
const searchForm = document.querySelector('.search-form');
const searchInput = document.getElementById('search-input');

let currentPage = 1;
let totalPages = 1;
let currentQuery = '';

const fetchAndDisplayMovies = async (page = 1, query = '') => {
    movieListContainer.innerHTML = '<div class="loading-spinner"></div>'; // Show loading indicator
    let data;
    if (query) {
        data = await searchMovies(query, page);
    } else {
        data = await getPopularMovies(page);
    }

    if (data && data.results.length > 0) {
        movieListContainer.innerHTML = ''; // Clear loading spinner
        data.results.forEach(movie => {
            const movieCard = createMovieCard(movie);
            movieListContainer.appendChild(movieCard);
        });
        currentPage = data.page;
        totalPages = data.total_pages;
        createPaginationControls(currentPage, totalPages, handlePageChange);
    } else {
        movieListContainer.innerHTML = '<p class="no-results">Film tidak ditemukan.</p>';
        createPaginationControls(1, 1, handlePageChange); // Reset pagination
    }
};

const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        fetchAndDisplayMovies(currentPage, currentQuery);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
    }
};

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    currentQuery = searchInput.value.trim();
    currentPage = 1; // Reset to first page on new search
    fetchAndDisplayMovies(currentPage, currentQuery);
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    fetchAndDisplayMovies();
});

// Optional: Add loading spinner style to style.css
// .loading-spinner {
//     border: 4px solid rgba(255, 255, 255, 0.3);
//     border-top: 4px solid var(--primary-color);
//     border-radius: 50%;
//     width: 40px;
//     height: 40px;
//     animation: spin 1s linear infinite;
//     margin: 50px auto;
// }

// @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
// }

// .no-results {
//     text-align: center;
//     font-size: 1.2rem;
//     color: var(--light-grey);
//     margin-top: 50px;
// }
