// js/components/navigation.js

export const setupNavigation = () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const navContent = `
        <a href="#" class="logo">MovieKu</a>
        <ul class="nav-links">
            <li><a href="#">Beranda</a></li>
            <li><a href="#">Film Populer</a></li>
            <li><a href="#">Film Mendatang</a></li>
            <li><a href="#">Genre</a></li>
        </ul>
    `;
    navbar.innerHTML = navContent;
};

