

(function () {
    const initPortfolio = () => {
        const track = document.querySelector('.portfolio__content');
        const slides = document.querySelectorAll('.portfolio .portfolio-card');
        const nextBtn = document.querySelector('.portfolio .portfolio__arrow_next');
        const prevBtn = document.querySelector('.portfolio .portfolio__arrow_prev');
        const counter = document.querySelector('.portfolio__pagination-number');
        const line = document.querySelector('.portfolio .portfolio__pagination-line');

        if (!track || !slides.length || !nextBtn || !prevBtn || !counter || !line) return;

        let indicator = line.querySelector('.portfolio__pagination-indicator');
        if (!indicator) {
            indicator = document.createElement('span');
            indicator.className = 'portfolio__pagination-indicator';
            line.appendChild(indicator);
        }

        const getVisibleCount = () => window.innerWidth <= 1024 ? 2 : 3;
        let visibleCount = getVisibleCount();
        let pages = Math.max(1, Math.ceil(slides.length / visibleCount));
        let currentPage = 0;

        const recalcVisibleCount = () => {
            const newCount = getVisibleCount();
            if (newCount !== visibleCount) {
                visibleCount = newCount;
                pages = Math.max(1, Math.ceil(slides.length / visibleCount));
                if (currentPage >= pages) {
                    currentPage = pages - 1;
                }
            }
        };

        const updateUI = (page) => {
            recalcVisibleCount();
            const segWidth = line.clientWidth / pages;
            indicator.style.width = `${segWidth}px`;
            indicator.style.transform = `translateX(${page * segWidth}px)`;
            counter.textContent = `${String(page + 1).padStart(2, '0')}/${String(pages).padStart(2, '0')}`;
        };

        let isProgrammaticScroll = false;
        let portfolioScrollEndTimer = null;

        const scrollToPage = (page) => {
            const startIndex = page * visibleCount;
            const slide = slides[startIndex] || slides[slides.length - 1];
            isProgrammaticScroll = true;
            if (portfolioScrollEndTimer) clearTimeout(portfolioScrollEndTimer);
            slide.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
            currentPage = page;
            updateUI(page);
            portfolioScrollEndTimer = setTimeout(() => {
                isProgrammaticScroll = false;
            }, 80);
        };

        nextBtn.addEventListener('click', () => {
            if (currentPage < pages - 1) scrollToPage(currentPage + 1);
        });

        prevBtn.addEventListener('click', () => {
            if (currentPage > 0) scrollToPage(currentPage - 1);
        });

        track.addEventListener('scroll', () => {
         
            if (line && indicator) {
                const segWidth = line.clientWidth / pages;
                const maxScroll = track.scrollWidth - track.clientWidth;
                const progress = maxScroll > 0 ? track.scrollLeft / maxScroll : 0;
                const maxTranslate = Math.max(0, line.clientWidth - segWidth);
                indicator.style.transform = `translateX(${progress * maxTranslate}px)`;
            }

            if (isProgrammaticScroll) return;
            if (portfolioScrollEndTimer) clearTimeout(portfolioScrollEndTimer);
            portfolioScrollEndTimer = setTimeout(() => {
                const trackRect = track.getBoundingClientRect();
                let nearestIndex = 0;
                let smallest = Number.POSITIVE_INFINITY;
                slides.forEach((s, i) => {
                    const rect = s.getBoundingClientRect();
                    const diff = Math.abs(rect.left - trackRect.left);
                    if (diff < smallest) { smallest = diff; nearestIndex = i; }
                });
                const page = Math.floor(nearestIndex / visibleCount);
                if (page !== currentPage) { currentPage = page; updateUI(currentPage); }
            }, 60);
        });

        updateUI(currentPage);
        window.addEventListener('resize', () => {
            recalcVisibleCount();
            if (currentPage >= pages) currentPage = pages - 1;
            updateUI(currentPage);
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPortfolio);
    } else {
        initPortfolio();
    }
})();


(function () {
    const initSlider = () => {
        const sliderTrack = document.querySelector('.partners__slider-track');
        const slides = document.querySelectorAll('.partners__card');
        const nextBtn = document.querySelector('#partnerNext');
        const prevBtn = document.querySelector('#partnerPrev');
        const counter = document.querySelector('#partnerCounter');
        const paginationItems = document.querySelectorAll('.partners__footer .js-pagination-item');

        if (!sliderTrack || !slides.length || !nextBtn || !prevBtn || !counter) return;

        const segments = paginationItems.length === slides.length ? paginationItems : [];

        const createPaginationItems = () => {
            const line = document.querySelector('.partners__footer .portfolio__pagination-line');
            if (!line) return [];
            line.innerHTML = '';
            const items = [];
            for (let i = 0; i < slides.length; i += 1) {
                const segment = document.createElement('span');
                segment.className = 'portfolio__pagination-segment js-pagination-item';
                if (i === 0) {
                    segment.classList.add('portfolio__pagination-segment_active');
                }
                line.appendChild(segment);
                items.push(segment);
            }
            return items;
        };

        const pagItems = segments.length === slides.length ? segments : createPaginationItems();
        let currentIndex = 0;

        const line = document.querySelector('.partners__footer .portfolio__pagination-line');
        let indicator = line ? line.querySelector('.portfolio__pagination-indicator') : null;
        if (line && !indicator) {
            indicator = document.createElement('span');
            indicator.className = 'portfolio__pagination-indicator';
            line.appendChild(indicator);
        }

        let isProgrammaticScroll = false;
        let partnersScrollEndTimer = null;

        const updateUI = (index) => {
            pagItems.forEach((seg, i) => {
                seg.classList.toggle('portfolio__pagination-segment_active', i === index);
            });

            const currentNum = String(index + 1).padStart(2, '0');
            const totalNum = String(slides.length).padStart(2, '0');
            counter.textContent = `${currentNum}/${totalNum}`;

            if (line && indicator) {
                const segWidth = line.clientWidth / slides.length;
                indicator.style.width = `${segWidth}px`;
                indicator.style.transform = `translateX(${index * segWidth}px)`;
            }
        };

        const scrollToIndex = (index) => {
            const slide = slides[index];
            if (!slide) return;
            isProgrammaticScroll = true;
            if (partnersScrollEndTimer) clearTimeout(partnersScrollEndTimer);
            slide.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
            currentIndex = index;
            updateUI(index);
            partnersScrollEndTimer = setTimeout(() => {
                isProgrammaticScroll = false;
            }, 80);
        };

        nextBtn.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                scrollToIndex(currentIndex + 1);
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                scrollToIndex(currentIndex - 1);
            }
        });

        sliderTrack.addEventListener('scroll', () => {
            
            if (line && indicator) {
                const segWidth = line.clientWidth / slides.length;
                const maxScroll = sliderTrack.scrollWidth - sliderTrack.clientWidth;
                const progress = maxScroll > 0 ? sliderTrack.scrollLeft / maxScroll : 0;
                const maxTranslate = Math.max(0, line.clientWidth - segWidth);
                indicator.style.transform = `translateX(${progress * maxTranslate}px)`;
            }

            if (isProgrammaticScroll) return;
            if (partnersScrollEndTimer) clearTimeout(partnersScrollEndTimer);
            partnersScrollEndTimer = setTimeout(() => {
                const trackRect = sliderTrack.getBoundingClientRect();
                let nearestIndex = currentIndex;
                let smallestDiff = Number.POSITIVE_INFINITY;

                slides.forEach((slide, i) => {
                    const rect = slide.getBoundingClientRect();
                    const diff = Math.abs(rect.left - trackRect.left);
                    if (diff < smallestDiff) {
                        smallestDiff = diff;
                        nearestIndex = i;
                    }
                });

                if (nearestIndex !== currentIndex) {
                    currentIndex = nearestIndex;
                    updateUI(currentIndex);
                }
            }, 60);
        });

        updateUI(currentIndex);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSlider);
    } else {
        initSlider();
    }
})();

(function () {
    const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const smoothScrollTo = (targetY, duration = 700) => {
        const startY = window.scrollY || window.pageYOffset;
        const maxY = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - window.innerHeight;
        const destinationY = Math.min(targetY, maxY);
        const startTime = performance.now();

        const step = (currentTime) => {
            const elapsed = Math.min(currentTime - startTime, duration);
            const progress = elapsed / duration;
            const eased = ease(progress);
            window.scrollTo(0, startY + (destinationY - startY) * eased);
            if (elapsed < duration) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    anchorLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const hash = link.getAttribute('href');
            const target = document.querySelector(hash);
            if (!target) return;
            event.preventDefault();
            const targetY = window.scrollY + target.getBoundingClientRect().top;
            smoothScrollTo(targetY, 700);
            window.history.pushState(null, '', hash);
        });
    });
})();




// MOBILE MENU


document.addEventListener('DOMContentLoaded', () => {


    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('#mobileMenu');
    const links = document.querySelectorAll('.mobile-menu .nav__link');

    if (burger && menu) {

        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                menu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

    }

    const faqHeaders = document.querySelectorAll('.faq-item__header');

    const setFaqBodyState = (body, open) => {
        if (open) {
            body.style.visibility = 'visible';
            body.style.opacity = '1';
            const fullHeight = body.scrollHeight;
            body.style.height = `${fullHeight}px`;
            const finishOpen = (event) => {
                if (event.propertyName !== 'height') return;
                body.style.height = 'auto';
                body.removeEventListener('transitionend', finishOpen);
            };
            body.addEventListener('transitionend', finishOpen);
        } else {
            const fullHeight = body.scrollHeight;
            body.style.height = `${fullHeight}px`;
            body.offsetHeight;
            body.style.opacity = '0';
            body.style.height = '0';
            const finishClose = (event) => {
                if (event.propertyName !== 'height') return;
                body.style.visibility = 'hidden';
                body.removeEventListener('transitionend', finishClose);
            };
            body.addEventListener('transitionend', finishClose);
        }
    };

    faqHeaders.forEach((header) => {
        const item = header.closest('.faq-item');
        const body = item ? item.querySelector('.faq-item__body') : null;
        if (!item || !body) return;

        if (item.classList.contains('faq-item_active')) {
            body.style.visibility = 'visible';
            body.style.opacity = '1';
            body.style.height = 'auto';
        } else {
            body.style.visibility = 'hidden';
            body.style.opacity = '0';
            body.style.height = '0';
        }

        header.addEventListener('click', () => {
            const isOpen = item.classList.contains('faq-item_active');
            if (isOpen) {
                item.classList.remove('faq-item_active');
                setFaqBodyState(body, false);
            } else {
                item.classList.add('faq-item_active');
                setFaqBodyState(body, true);
            }
        });
    });

});