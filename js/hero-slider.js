/* ============================================
   HERO SLIDER FUNCTIONALITY
   ============================================ */

class HeroSlider {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 5;
        this.isAnimating = false;

        // DOM Elements
        this.backgrounds = document.querySelectorAll('.hero-bg');
        this.slideContents = document.querySelectorAll('.hero-slide-content');
        this.cards = document.querySelectorAll('.hero-card');
        this.dots = document.querySelectorAll('.hero-slider-dots .dot');
        this.prevBtn = document.querySelector('.hero-slider-nav.prev');
        this.nextBtn = document.querySelector('.hero-slider-nav.next');

        this.init();
    }

    init() {
        // Event Listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.nextSlide());
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.previousSlide());
        }

        // Dots navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Card click navigation - only middle card (next) advances slider
        this.cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                const diff = index - this.currentSlide;
                // Only allow clicking the next card (middle position)
                if (diff === 1 || (this.currentSlide === this.totalSlides - 1 && index === 0)) {
                    this.nextSlide();
                }
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.nextSlide();
            if (e.key === 'ArrowRight') this.previousSlide();
        });

        // Auto-play (optional - uncomment to enable)
        // this.startAutoPlay();
    }

    goToSlide(index) {
        if (this.isAnimating || index === this.currentSlide) return;

        this.isAnimating = true;
        const previousSlide = this.currentSlide;
        this.currentSlide = index;

        // Update backgrounds with smooth transition
        this.updateBackground(previousSlide, index);

        // Update content
        this.updateContent(previousSlide, index);

        // Update cards with stagger effect
        this.updateCards(index);

        // Update dots
        this.updateDots(index);

        // Reset animation lock (reduced to match faster transitions)
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }

    updateBackground(from, to) {
        // Fade out previous background
        if (this.backgrounds[from]) {
            this.backgrounds[from].classList.remove('active');
        }

        // Fade in new background
        if (this.backgrounds[to]) {
            this.backgrounds[to].classList.add('active');
        }
    }

    updateContent(from, to) {
        // Fade out previous content
        if (this.slideContents[from]) {
            this.slideContents[from].classList.remove('active');
        }

        // Fade in new content with slight delay
        setTimeout(() => {
            if (this.slideContents[to]) {
                this.slideContents[to].classList.add('active');
            }
        }, 200);
    }

    updateCards(activeIndex) {
        this.cards.forEach((card, index) => {
            card.classList.remove('active');

            // Reset all cards first
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

            // Calculate positions for horizontal layout (left card is main)
            const diff = index - activeIndex;

            if (diff === 0) {
                // Active card - LEFT (main position)
                card.classList.add('active');
                card.style.left = '0';
                card.style.top = '50%';
                card.style.transform = 'translateY(-50%) scale(1)';
                card.style.opacity = '1';
                card.style.zIndex = '2';
                card.style.pointerEvents = 'all';
            } else if (diff === 1 || (activeIndex === this.totalSlides - 1 && index === 0)) {
                // Next card - middle
                card.style.left = '200px';
                card.style.top = '50%';
                card.style.transform = 'translateY(-50%) scale(0.75)';
                card.style.opacity = '0.8';
                card.style.zIndex = '1';
                card.style.pointerEvents = 'all';
            } else if (diff === 2 || (activeIndex === this.totalSlides - 2 && index === 0) || (activeIndex === this.totalSlides - 1 && index === 1)) {
                // Second next card - right
                card.style.left = '360px';
                card.style.top = '50%';
                card.style.transform = 'translateY(-50%) scale(0.75)';
                card.style.opacity = '0.8';
                card.style.zIndex = '1';
                card.style.pointerEvents = 'all';
            } else {
                // Hidden cards
                card.style.opacity = '0';
                card.style.pointerEvents = 'none';
                card.style.zIndex = '-1';
            }
        });
    }

    updateDots(activeIndex) {
        this.dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }

    startAutoPlay(interval = 5000) {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, interval);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// Initialize slider when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const heroSliderElement = document.querySelector('.hero-slider');
    if (heroSliderElement) {
        window.heroSlider = new HeroSlider();
    }
});

// Pause auto-play on user interaction (if enabled)
document.addEventListener('visibilitychange', () => {
    if (window.heroSlider) {
        if (document.hidden) {
            window.heroSlider.stopAutoPlay();
        } else {
            // Optionally restart auto-play when page becomes visible
            // window.heroSlider.startAutoPlay();
        }
    }
});
