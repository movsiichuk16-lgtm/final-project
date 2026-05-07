// Код для СТАРОГО слайдера (Portfolio - прокрутка)
document.addEventListener('DOMContentLoaded', () => {
    const sliderContent = document.querySelector('.portfolio__content');
    const nextBtn = document.querySelector('.portfolio__arrow_next');
    const prevBtn = document.querySelector('.portfolio__arrow_prev');

    if (sliderContent && nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            sliderContent.scrollBy({ left: 568, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            sliderContent.scrollBy({ left: -568, behavior: 'smooth' });
        });
    }
});

// Код для НОВОГО слайдера (Partners - переключение классов)
(function() {
    const initSlider = () => {
        const slides = document.querySelectorAll('.js-slide');
        const nextBtn = document.querySelector('#partnerNext');
        const prevBtn = document.querySelector('#partnerPrev');
        const counter = document.querySelector('#partnerCounter');
        const segments = document.querySelectorAll('.js-pagination-item');

        if (!slides.length || !nextBtn || !prevBtn) return;

        let currentIndex = 0;

        const updateUI = (index) => {
            slides.forEach((s, i) => {
                s.classList.toggle('active', i === index);
            });
            
            segments.forEach((seg, i) => {
                seg.classList.toggle('portfolio__pagination-segment_active', i === index);
            });

            const currentNum = String(index + 1).padStart(2, '0');
            const totalNum = String(slides.length).padStart(2, '0');
            if (counter) counter.textContent = `${currentNum}/${totalNum}`;
        };

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateUI(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateUI(currentIndex);
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSlider);
    } else {
        initSlider();
    }
})();