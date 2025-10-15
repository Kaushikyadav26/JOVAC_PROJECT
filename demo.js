//moving part in js or sliding part
document.addEventListener("DOMContentLoaded", function () {
var typed=new Typed(".text",{
    strings:["Find...","Get...","Search..."],
    typeSpeed:100,
    backSpeed:80,
    backDelay:1000,
    loop:true,
    });
});





const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const dots = document.querySelectorAll('.dot');
const cards = document.querySelectorAll('.card');

let currentIndex = 0;
const cardWidth = cards[0].offsetWidth + 30; // 30px gap

// Next button click
nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - 3) {
        currentIndex++;
        updateCarousel();
    }
});

// Previous button click
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// Update carousel position
function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateDots();
}

// Update dots
function updateDots() {
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Dot click functionality
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

// Tab button functionality
const tabBtns = document.querySelectorAll('.tab-btn');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        console.log('Filter selected:', filter);
    });
});

// Search button functionality
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');

searchBtn.addEventListener('click', () => {
    const searchValue = searchInput.value.trim();
    if (searchValue) {
        console.log('Searching for:', searchValue);
        // Add your search logic here
    } else {
        alert('Please enter a location');
    }
});

// Allow Enter key in search input
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// Smooth scroll for navigation
const navLinks = document.querySelectorAll('.nav a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Auto-scroll carousel (optional)
let autoScrollInterval;

function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        if (currentIndex < cards.length - 3) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }, 5000); // Change every 5 seconds
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Uncomment to enable auto-scroll
// startAutoScroll();

// Stop auto-scroll on user interaction
carousel.addEventListener('mouseenter', stopAutoScroll);
carousel.addEventListener('mouseleave', startAutoScroll);

// Card click functionality
cards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').textContent;
        console.log('Card clicked:', title);
        // Add your navigation logic here
    });
});

// Responsive carousel adjustment
function adjustCarouselForResponsive() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth <= 768) {
        // Show 1 card on mobile
        const maxScroll = cards.length - 1;
        if (currentIndex > maxScroll) {
            currentIndex = maxScroll;
            updateCarousel();
        }
    } else if (screenWidth <= 1024) {
        // Show 2 cards on tablet
        const maxScroll = cards.length - 2;
        if (currentIndex > maxScroll) {
            currentIndex = maxScroll;
            updateCarousel();
        }
    }
}

window.addEventListener('resize', adjustCarouselForResponsive);
window.addEventListener('load', adjustCarouselForResponsive);

// Feature cards animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const features = document.querySelectorAll('.feature');
features.forEach(feature => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateY(20px)';
    feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(feature);
});


// ===== LOGIN / REGISTER POPUP =====
const openPopupBtn = document.getElementById('openPopupBtn');
const popupOverlay = document.getElementById('popupOverlay');
const closePopupBtn = document.getElementById('closePopupBtn');
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

if (openPopupBtn && popupOverlay) {
  openPopupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    popupOverlay.style.display = 'flex';
  });

  closePopupBtn.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
  });

  loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
  });

  registerTab.addEventListener('click', () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
  });

  popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
      popupOverlay.style.display = 'none';
    }
  });
}
