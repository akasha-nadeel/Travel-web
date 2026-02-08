document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('fsTrack');
    const prevBtn = document.getElementById('fsPrev');
    const nextBtn = document.getElementById('fsNext');

    if (!track || !prevBtn || !nextBtn) return;

    // Initial setup - Clone cards for seamless infinite loop
    const originalCards = Array.from(track.querySelectorAll('.adventure-card'));
    if (originalCards.length === 0) return;

    const cloneCount = 3; // Clone enough for max visible items

    // Add clones
    originalCards.slice(0, cloneCount).forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add('clone');
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    });

    originalCards.slice(-cloneCount).reverse().forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add('clone');
        clone.setAttribute('aria-hidden', 'true');
        track.insertBefore(clone, track.firstChild);
    });

    let allCards = track.querySelectorAll('.adventure-card');
    let currentIndex = cloneCount;
    let isTransitioning = false;

    function getCardWidth() {
        const card = allCards[0];
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.gap) || 0;
        const width = card.getBoundingClientRect().width;
        return width + gap;
    }

    function updateSlider(withTransition = true) {
        const moveAmount = getCardWidth();

        if (!withTransition) {
            track.style.transition = 'none';
        } else {
            track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }

        track.style.transform = `translateX(-${currentIndex * moveAmount}px)`;

        // Highlight Center Logic
        allCards.forEach(c => c.classList.remove('active-center'));

        let centerOffset = 0;
        if (window.innerWidth > 1024) {
            centerOffset = 1; // Middle of 3
        }

        const targetIndex = currentIndex + centerOffset;
        if (allCards[targetIndex]) {
            allCards[targetIndex].classList.add('active-center');
        }
    }

    // Initial position
    setTimeout(() => {
        updateSlider(false);
        prevBtn.style.opacity = '1';
        nextBtn.style.opacity = '1';
        prevBtn.style.cursor = 'pointer';
        nextBtn.style.cursor = 'pointer';
    }, 100);

    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;

        currentIndex++;
        isTransitioning = true;
        updateSlider(true);
    });

    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;

        currentIndex--;
        isTransitioning = true;
        updateSlider(true);
    });

    track.addEventListener('transitionend', () => {
        isTransitioning = false;

        const realCount = originalCards.length;

        if (currentIndex >= realCount + cloneCount) {
            currentIndex = currentIndex - realCount;
            updateSlider(false);
        }

        if (currentIndex < cloneCount) {
            currentIndex = currentIndex + realCount;
            updateSlider(false);
        }
    });

    window.addEventListener('resize', () => {
        updateSlider(false);
    });
});
