// js/components/pagination.js

export const createPaginationControls = (currentPage, totalPages, onPageChange) => {
    const paginationControls = document.getElementById('pagination-controls');
    paginationControls.innerHTML = ''; // Clear existing controls

    const prevButton = document.createElement('button');
    prevButton.classList.add('pagination-button');
    prevButton.textContent = 'Sebelumnya';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => onPageChange(currentPage - 1));

    const currentPageSpan = document.createElement('span');
    currentPageSpan.classList.add('current-page');
    currentPageSpan.textContent = `Halaman ${currentPage} dari ${totalPages}`;

    const nextButton = document.createElement('button');
    nextButton.classList.add('pagination-button');
    nextButton.textContent = 'Berikutnya';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => onPageChange(currentPage + 1));

    paginationControls.appendChild(prevButton);
    paginationControls.appendChild(currentPageSpan);
    paginationControls.appendChild(nextButton);
};

