document.addEventListener('DOMContentLoaded', () => {
    // Data untuk slider (diambil dari movies.js)
    const heroSlides = allMovies.slice(-3).map(movie => ({
        title: movie.title,
        subtitle: `Tahun: ${movie.year} | ${movie.genre}`,
        background: movie.poster,
        videoUrl: movie.videoUrl
    }));

    const mainPage = document.getElementById('main-page');
    const mainContent = document.getElementById('main-content');
    const detailPage = document.getElementById('detail-page');
    const backBtn = document.getElementById('back-btn');
    const detailPoster = document.getElementById('detail-poster');
    const detailTitle = document.getElementById('detail-title');
    const detailVideoPlayer = document.getElementById('detail-video-player');
    const sectionTitle = document.getElementById('section-title');
    const yearToggleBtn = document.getElementById('year-toggle');
    const yearDropdown = document.getElementById('year-dropdown');

    // Kontrol untuk slider
    const sliderWrapper = document.getElementById('slider-wrapper');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const sliderDotsContainer = document.getElementById('slider-dots');
    let currentSlide = 0;
    let slideInterval;

    // Fungsi untuk merender slider
    function renderHeroSlides() {
        sliderWrapper.innerHTML = '';
        sliderDotsContainer.innerHTML = '';
        heroSlides.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.classList.add('slider-slide');
            slideElement.style.backgroundImage = `url('${slide.background}')`;
            slideElement.innerHTML = `
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                <div class="absolute bottom-10 left-10 p-4">
                    <h2 class="text-xl md:text-3xl font-bold mb-2">${slide.title}</h2>
                    <p class="text-sm md:text-base text-gray-300">${slide.subtitle}</p>
                    <a href="#" data-video-url="${slide.videoUrl}" class="play-btn mt-4 inline-block bg-orange-500 hover:bg-orange-600 text-gray-900 font-bold py-2 px-6 rounded-full transition-colors">Play Now</a>
                </div>
            `;
            sliderWrapper.appendChild(slideElement);

            const dot = document.createElement('span');
            dot.classList.add('slider-dot');
            dot.addEventListener('click', () => showSlide(index));
            sliderDotsContainer.appendChild(dot);
        });
        showSlide(currentSlide);
        startAutoSlide();
    }

    // Fungsi untuk menampilkan slide tertentu
    function showSlide(index) {
        currentSlide = index;
        const slides = document.querySelectorAll('.slider-slide');
        const dots = document.querySelectorAll('.slider-dot');
        const offset = -currentSlide * 100;
        sliderWrapper.style.transform = `translateX(${offset}%)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Fungsi untuk slide berikutnya
    function nextSlide() {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(currentSlide);
    }

    // Fungsi untuk slide sebelumnya
    function prevSlide() {
        currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
        showSlide(currentSlide);
    }

    // Fungsi untuk memulai geser otomatis
    function startAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Event listener untuk tombol navigasi slider
    nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoSlide();
    });

    // Delegasi event untuk tombol "Play Now" pada slider
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('play-btn')) {
            event.preventDefault();
            const videoUrl = event.target.getAttribute('data-video-url');
            if (videoUrl) {
                showMovieDetail(heroSlides[currentSlide]);
            }
        }
    });

    // Fungsi untuk merender daftar film ke container tertentu
    function renderMovies(moviesArray) {
        const container = document.getElementById('movie-list-container');
        container.innerHTML = '';
        moviesArray.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card', 'bg-gray-800', 'rounded-lg', 'overflow-hidden', 'cursor-pointer', 'transform', 'transition-transform', 'duration-200', 'hover:scale-105', 'shadow-md');

            const posterImg = document.createElement('img');
            posterImg.src = movie.poster;
            posterImg.alt = movie.title;
            posterImg.classList.add('w-full', 'h-auto', 'object-cover', 'rounded-t-lg');
            
            const titleElement = document.createElement('h3');
            titleElement.textContent = movie.title;
            titleElement.classList.add('p-3', 'text-sm', 'md:text-base', 'text-center', 'truncate');
            
            if (movie.label) {
                const genreLabel = document.createElement('span');
                genreLabel.classList.add('label-genre');
                genreLabel.textContent = movie.label;
                movieCard.appendChild(genreLabel);
            }

            if (movie.rating) {
                const ratingLabel = document.createElement('span');
                ratingLabel.classList.add('rating-label');
                ratingLabel.textContent = movie.rating.toFixed(1);
                movieCard.appendChild(ratingLabel);
            }

            movieCard.addEventListener('click', () => {
                showMovieDetail(movie);
            });

            movieCard.appendChild(posterImg);
            movieCard.appendChild(titleElement);
            container.appendChild(movieCard);
        });
    }

    // Fungsi untuk menampilkan tampilan detail film
    function showMovieDetail(movie) {
        mainPage.classList.add('hidden');
        mainContent.classList.add('hidden');
        detailPage.classList.remove('hidden');

        detailPoster.src = movie.poster;
        detailTitle.textContent = movie.title;
        detailVideoPlayer.src = movie.videoUrl;
    }

    // Fungsi untuk kembali ke halaman utama
    function backToMainPage() {
        mainPage.classList.remove('hidden');
        mainContent.classList.remove('hidden');
        detailPage.classList.add('hidden');
        detailVideoPlayer.src = '';
        renderMovies(allMovies);
        sectionTitle.textContent = "Semua Film";
    }

    backBtn.addEventListener('click', backToMainPage);

    // Fungsionalitas Year dropdown
    const uniqueYears = [];
    for (let year = 2025; year >= 2001; year--) {
        uniqueYears.push(year);
    }

    yearToggleBtn.addEventListener('click', (event) => {
        event.preventDefault();
        yearDropdown.classList.toggle('hidden');
    });
    
    function renderYearDropdown() {
        yearDropdown.innerHTML = '';
        uniqueYears.forEach(year => {
            const yearLink = document.createElement('a');
            yearLink.href = '#';
            yearLink.textContent = year;
            yearLink.classList.add('block', 'px-4', 'py-2', 'hover:bg-gray-600', 'transition-colors');
            yearLink.addEventListener('click', (event) => {
                event.preventDefault();
                const filteredMovies = allMovies.filter(movie => movie.year === year);
                renderMovies(filteredMovies);
                sectionTitle.textContent = `Tahun ${year}`;
                mainPage.classList.remove('hidden');
                mainContent.classList.add('hidden');
                detailPage.classList.add('hidden');
                yearDropdown.classList.add('hidden');
            });
            yearDropdown.appendChild(yearLink);
        });
    }
    renderYearDropdown();

    // Menjadikan tombol navigasi berfungsi
    const navLinks = document.querySelectorAll('#nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            
            const filterType = event.target.getAttribute('data-filter-type');
            const filterValue = event.target.getAttribute('data-filter-value');
            
            if (filterType === 'all') {
                backToMainPage();
            } else if (filterType === 'genre') {
                const filteredMovies = allMovies.filter(movie => movie.genre === filterValue);
                renderMovies(filteredMovies);
                sectionTitle.textContent = `${filterValue} List`;
                mainPage.classList.remove('hidden');
                mainContent.classList.add('hidden');
                detailPage.classList.add('hidden');
            }
        });
    });

    // Panggil fungsi untuk merender film di setiap bagian
    renderHeroSlides();
    renderMovies(allMovies);
});
