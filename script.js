document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const movieDetailPage = document.getElementById('movie-detail-page');
    const backToHomeBtn = document.getElementById('back-to-home');
    const sectionTitle = document.getElementById('section-title');
    const movieListContainer = document.getElementById('movie-list-container');
    const videoModal = document.getElementById('video-modal');
    const closeBtn = document.querySelector('.close-btn');
    const videoPlayer = document.getElementById('video-player');
    const homeLink = document.getElementById('home-link');
    const yearDropdownBtn = document.getElementById('year-dropdown-btn');
    const yearDropdownMenu = document.getElementById('year-dropdown-menu');

    // Detail Page Elements
    const detailPoster = document.getElementById('detail-poster');
    const detailTitle = document.getElementById('detail-title');
    const detailDescription = document.getElementById('detail-description');
    const detailVideoPlayer = document.getElementById('detail-video-player');
    const downloadBtn = document.getElementById('download-btn');
    const detailLabelContainer = document.getElementById('detail-label-container');
    const detailRatingContainer = document.getElementById('detail-rating-container');
    const episodeListContainer = document.getElementById('episode-list-container');
    
    // Mobile menu elements
    const menuBtn = document.getElementById('menu-btn');
    const mainNav = document.getElementById('main-nav');
    
    // Mobile search elements
    const searchMobileBtn = document.getElementById('search-mobile-btn');
    const searchModal = document.getElementById('search-modal');
    const closeSearchModalBtn = document.getElementById('close-search-modal');
    const searchInputMobile = document.getElementById('search-input-mobile');
    const searchInputDesktop = document.getElementById('search-input-desktop');


    // --- FUNGSI BANTUAN ---
    
    // Fungsi untuk merender daftar film
    function renderMovies(moviesToRender) {
        movieListContainer.innerHTML = '';
        moviesToRender.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card', 'rounded-lg', 'overflow-hidden', 'shadow-lg', 'cursor-pointer', 'transform', 'hover:scale-105', 'transition-transform', 'duration-300');
            movieCard.dataset.title = movie.title;
    
            const posterImg = document.createElement('img');
            posterImg.src = movie.poster;
            posterImg.alt = movie.title;
            posterImg.classList.add('w-full', 'h-auto');
            
            const titleElement = document.createElement('h3');
            titleElement.classList.add('text-sm', 'md:text-base', 'font-semibold', 'text-center', 'py-2', 'px-1');
            titleElement.textContent = movie.title;
    
            const labelSpan = document.createElement('span');
            labelSpan.classList.add('label');
            labelSpan.textContent = movie.label;
    
            const ratingSpan = document.createElement('span');
            ratingSpan.classList.add('rating');
            ratingSpan.textContent = movie.rating;
    
            movieCard.appendChild(posterImg);
            movieCard.appendChild(titleElement);
            movieCard.appendChild(labelSpan);
            movieCard.appendChild(ratingSpan);
            movieListContainer.appendChild(movieCard);
        });
    }
    
    // Fungsi untuk merender tombol episode
    function renderEpisodes(episodes) {
        episodeListContainer.innerHTML = `
            <h3 class="text-xl font-bold mb-4">Pilih Episode</h3>
            <div id="episode-buttons" class="flex flex-wrap gap-2"></div>
        `;
        const episodeButtons = document.getElementById('episode-buttons');
        episodes.forEach(episode => {
            const button = document.createElement('button');
            button.textContent = `Episode ${episode.episodeNumber}`;
            button.classList.add('bg-gray-700', 'text-white', 'py-1', 'px-3', 'rounded-md', 'hover:bg-orange-500', 'transition-colors');
            button.addEventListener('click', () => {
                detailVideoPlayer.src = episode.videoUrl;
            });
            episodeButtons.appendChild(button);
        });
    }

    // --- FUNGSI UTAMA ---

    // Fungsi untuk menampilkan halaman detail film
    function showMovieDetail(movieTitle) {
        const movie = allMovies.find(m => m.title === movieTitle);
        if (movie) {
            mainContent.classList.add('hidden');
            movieDetailPage.classList.remove('hidden');
            
            detailTitle.textContent = movie.title;
            detailPoster.src = movie.poster;
            detailDescription.textContent = movie.description || "Deskripsi tidak tersedia.";
            detailVideoPlayer.src = movie.videoUrl || (movie.episodes ? movie.episodes[0].videoUrl : '');
            
            if (movie.downloadUrl) {
                downloadBtn.classList.remove('hidden');
                downloadBtn.href = movie.downloadUrl;
            } else {
                downloadBtn.classList.add('hidden');
            }
            
            // Menampilkan label dan rating
            detailLabelContainer.innerHTML = `<span class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">${movie.label}</span>`;
            detailRatingContainer.innerHTML = `<span class="bg-gray-700 text-white text-xs font-bold px-2 py-1 rounded-full">${movie.rating}</span>`;
            
            // Menampilkan daftar episode jika ada
            if (movie.episodes) {
                episodeListContainer.classList.remove('hidden');
                renderEpisodes(movie.episodes);
            } else {
                episodeListContainer.classList.add('hidden');
            }
        }
    }

    // --- EVENT LISTENERS ---

    // Navigasi
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = e.target.dataset.filter;
            if (filter) {
                let filteredMovies = [];
                if (filter === 'All') {
                    filteredMovies = [...allMovies].reverse();
                    sectionTitle.textContent = 'Semua Film';
                } else if (filter === 'Movie' || filter === 'Donghua') {
                    filteredMovies = allMovies.filter(movie => movie.genre === filter);
                    sectionTitle.textContent = `Film ${filter}`;
                }
                mainContent.classList.remove('hidden');
                movieDetailPage.classList.add('hidden');
                renderMovies(filteredMovies);
            }
        });
    });

    // Tombol tahun dropdown
    yearDropdownBtn.addEventListener('click', (e) => {
        e.preventDefault();
        yearDropdownMenu.classList.toggle('hidden');
    });

    yearDropdownMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const selectedYear = e.target.dataset.year;
            const filteredMovies = allMovies.filter(movie => movie.year.toString() === selectedYear);
            sectionTitle.textContent = `Tahun ${selectedYear}`;
            renderMovies(filteredMovies);
            yearDropdownMenu.classList.add('hidden');
            mainContent.classList.remove('hidden');
            movieDetailPage.classList.add('hidden');
        }
    });

    // Menangani klik poster untuk membuka halaman detail
    movieListContainer.addEventListener('click', (e) => {
        const movieCard = e.target.closest('.movie-card');
        if (movieCard) {
            const movieTitle = movieCard.dataset.title;
            showMovieDetail(movieTitle);
        }
    });
    
    // Kembali ke halaman utama
    homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            mainContent.classList.remove('hidden');
            movieDetailPage.classList.add('hidden');
            sectionTitle.textContent = 'Semua Film';
            renderMovies([...allMovies].reverse());
    });
    
    backToHomeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        mainContent.classList.remove('hidden');
        movieDetailPage.classList.add('hidden');
    });

    // Mobile menu
    menuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('hidden');
    });

    // Mobile search modal
    searchMobileBtn.addEventListener('click', () => {
        searchModal.classList.remove('hidden');
        searchInputMobile.focus();
    });

    closeSearchModalBtn.addEventListener('click', () => {
        searchModal.classList.add('hidden');
        searchInputMobile.value = '';
    });
    
    // Filter dan search
    function filterMovies(query) {
        const filteredMovies = allMovies.filter(movie => 
            movie.title.toLowerCase().includes(query.toLowerCase())
        );
        sectionTitle.textContent = `Hasil Pencarian untuk "${query}"`;
        renderMovies(filteredMovies);
    }
    
    searchInputMobile.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchModal.classList.add('hidden');
            mainContent.classList.remove('hidden');
            movieDetailPage.classList.add('hidden');
            filterMovies(searchInputMobile.value);
        }
    });
    
    searchInputDesktop.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            mainContent.classList.remove('hidden');
            movieDetailPage.classList.add('hidden');
            filterMovies(searchInputDesktop.value);
        }
    });

    // Inisialisasi
    function initialize() {
        // Render tahun untuk dropdown
        const years = new Set();
        for (let i = 2025; i >= 2001; i--) {
            years.add(i);
        }
        years.forEach(year => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = year;
            link.dataset.year = year;
            link.classList.add('block', 'px-4', 'py-2', 'hover:bg-gray-700');
            yearDropdownMenu.appendChild(link);
        });

        renderMovies([...allMovies].reverse());
    }
    
    initialize();

});
