document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const movieDetailPage = document.getElementById('movie-detail-page');
    const backToHomeBtn = document.getElementById('back-to-home');
    const sectionTitle = document.getElementById('section-title');
    const movieListContainer = document.getElementById('movie-list-container');
    const videoModal = document.getElementById('video-modal');
    const closeBtn = document.querySelector('.close-btn');
    const videoPlayer = document.getElementById('video-player');
    const heroSlider = document.getElementById('hero-slider');
    const sliderWrapper = heroSlider.querySelector('.slider-wrapper');
    const sliderPrevBtn = heroSlider.querySelector('#slider-prev');
    const sliderNextBtn = heroSlider.querySelector('#slider-next');
    const sliderDotsContainer = heroSlider.querySelector('#slider-dots');
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

    let currentSlide = 0;
    let autoSlideInterval;

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

    // Fungsi untuk merender slider hero
    function renderHeroSlider() {
        sliderWrapper.innerHTML = '';
        sliderDotsContainer.innerHTML = '';
        heroSlides.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.classList.add('w-full', 'h-full', 'flex-shrink-0', 'relative', 'bg-cover', 'bg-center', 'text-white', 'flex', 'items-end', 'p-8', 'md:p-12', 'group');
            slideElement.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url('${slide.poster}')`;
    
            slideElement.innerHTML = `
                <div class="z-10">
                    <h2 class="text-3xl md:text-5xl font-bold mb-2">${slide.title}</h2>
                    <p class="text-sm md:text-base max-w-xl mb-4">${slide.description}</p>
                    <button class="play-now-btn bg-orange-500 text-white font-bold py-2 px-4 rounded-full hover:bg-orange-600 transition-colors">
                        <i class="fas fa-play mr-2"></i> Play Now
                    </button>
                </div>
            `;
            slideElement.querySelector('.play-now-btn').addEventListener('click', () => {
                showMovieDetail(slide.title);
            });
    
            sliderWrapper.appendChild(slideElement);
    
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoSlide();
            });
            sliderDotsContainer.appendChild(dot);
        });
    }

    // Fungsi untuk menggeser slider
    function goToSlide(index) {
        currentSlide = index;
        const offset = -currentSlide * 100;
        sliderWrapper.style.transform = `translateX(${offset}%)`;
        
        document.querySelectorAll('.slider-dot').forEach((dot, dotIndex) => {
            if (dotIndex === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Fungsi untuk mengelola perpindahan slide otomatis
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % heroSlides.length;
            goToSlide(currentSlide);
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
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
                    filteredMovies = allMovies;
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
            renderMovies(allMovies);
            renderHeroSlider(); // Re-render the slider
            startAutoSlide(); // Restart the auto-slide
    });
    
    backToHomeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        mainContent.classList.remove('hidden');
        movieDetailPage.classList.add('hidden');
    });

    // Slider controls
    sliderNextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        goToSlide(currentSlide);
        resetAutoSlide();
    });

    sliderPrevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
        goToSlide(currentSlide);
        resetAutoSlide();
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

        renderMovies(allMovies);
        renderHeroSlider();
        startAutoSlide();
    }
    
    initialize();

});
