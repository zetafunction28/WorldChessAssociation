// ===== Navigation Active State =====
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNavLink();
    setupEventListeners();
    initLanguageToggle();
    initSearchFunctionality();
    animateOnScroll();
});

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===== Event Listeners Setup =====
function setupEventListeners() {
    // Rank cards click handlers
    const rankCards = document.querySelectorAll('.rank-card');
    rankCards.forEach(card => {
        card.addEventListener('click', function() {
            const playerName = this.querySelector('.player-info h3').textContent.trim();
            // In a real app, navigate to player profile
            console.log('Navigating to player profile:', playerName);
        });
        card.style.cursor = 'pointer';
    });

    // News cards click handlers
    const newsCards = document.querySelectorAll('.news-card, .news-main');
    newsCards.forEach(card => {
        card.addEventListener('click', function() {
            // In a real app, navigate to full article
            console.log('Navigating to article');
        });
    });

    // Match items click handlers
    const matchItems = document.querySelectorAll('.match-item');
    matchItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('Navigating to match details');
        });
        item.style.cursor = 'pointer';
    });

    // Results table rows click handlers
    const resultRows = document.querySelectorAll('.result-row');
    resultRows.forEach(row => {
        row.addEventListener('click', function() {
            console.log('Navigating to match result details');
        });
        row.style.cursor = 'pointer';
    });

    // Logo click handler
    const logo = document.querySelector('.logo-section');
    if (logo) {
        logo.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
        logo.style.cursor = 'pointer';
    }

    // Button handlers
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===== Language Toggle =====
function initLanguageToggle() {
    const langButtons = document.querySelectorAll('.lang');
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const lang = this.textContent.trim();
            console.log('Language changed to:', lang);
            // In a real app, implement language switching
        });
    });
}

// ===== Search Functionality =====
function initSearchFunctionality() {
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            console.log('Search clicked');
            // In a real app, open search modal
        });
    }
}

// ===== Smooth Scroll Animation =====
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all rank cards
    document.querySelectorAll('.rank-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe all news cards
    document.querySelectorAll('.news-card, .news-main').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe match items
    document.querySelectorAll('.match-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// ===== Sticky Header Scroll Effect =====
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});

// ===== Ticker Animation Reset =====
function resetTickerAnimation() {
    const ticker = document.querySelector('.news-ticker');
    if (ticker) {
        ticker.addEventListener('animationend', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'scroll-left 30s linear infinite';
            }, 100);
        });
    }
}

resetTickerAnimation();

// ===== Live Matches Button =====
function setupLiveButton() {
    const liveBtn = document.querySelector('.live-btn');
    if (liveBtn) {
        liveBtn.addEventListener('click', function() {
            // In a real app, filter matches to show only live ones
            console.log('Showing live matches');
        });
    }
}

setupLiveButton();

// ===== Responsive Menu (Mobile) =====
function setupMobileMenu() {
    // Check if screen is small
    if (window.innerWidth < 768) {
        const mainNav = document.querySelector('.main-nav');
        if (mainNav) {
            mainNav.style.display = 'flex';
            mainNav.style.flexDirection = 'column';
            mainNav.style.position = 'absolute';
            mainNav.style.top = '100%';
            mainNav.style.left = '0';
            mainNav.style.right = '0';
            mainNav.style.backgroundColor = 'rgba(26, 26, 26, 0.98)';
            mainNav.style.padding = '1rem';
            mainNav.style.display = 'none';
            mainNav.style.zIndex = '999';
        }
    }
}

window.addEventListener('resize', setupMobileMenu);
setupMobileMenu();

// ===== Player Profile Navigation =====
function navigateToPlayerProfile(playerName) {
    // Convert player name to URL slug
    const slug = playerName.toLowerCase().replace(/\s+/g, '-');
    window.location.href = `players/${slug}.html`;
}

// ===== News Article Navigation =====
function navigateToArticle(articleId) {
    window.location.href = `news/${articleId}.html`;
}

// ===== Match Details Navigation =====
function navigateToMatchDetails(matchId) {
    window.location.href = `matches/${matchId}.html`;
}

// ===== Utility Functions =====

// Format date to readable format
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
}

// Get ranking change indicator
function getRankingChangeIndicator(change) {
    if (change > 0) return `▲${change}`;
    if (change < 0) return `▼${Math.abs(change)}`;
    return '—';
}

// Format rating with thousand separator
function formatRating(rating) {
    return rating.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ===== Loading State Management =====
function showLoadingState(element) {
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
}

function hideLoadingState(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// ===== Toast Notification =====
function showNotification(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#4a7c4e' : type === 'error' ? '#8b3a3a' : '#3a3a3a'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ===== Keyboard Navigation =====
document.addEventListener('keydown', function(event) {
    // Press '/' to focus search
    if (event.key === '/' && !event.ctrlKey && !event.metaKey) {
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn && document.activeElement !== searchBtn) {
            event.preventDefault();
            searchBtn.click();
        }
    }

    // Press 'Escape' to close modals (if they exist)
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('[role="dialog"]');
        modals.forEach(modal => {
            if (modal.style.display !== 'none') {
                modal.style.display = 'none';
            }
        });
    }
});

// ===== Analytics Tracking (placeholder) =====
function trackPageView(pageName) {
    console.log('Page view tracked:', pageName);
    // In a real app, send to analytics service
}

function trackEvent(eventName, eventData) {
    console.log('Event tracked:', eventName, eventData);
    // In a real app, send to analytics service
}

// Track page view on load
window.addEventListener('load', function() {
    trackPageView(window.location.pathname);
});

// ===== Accessibility Enhancements =====
function enhanceAccessibility() {
    // Add focus styles to all interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], [tabindex]'
    );

    interactiveElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = `2px solid var(--burgundy)`;
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

enhanceAccessibility();

// ===== Print Stylesheet Support =====
window.addEventListener('beforeprint', function() {
    // Hide navigation and search on print
    const header = document.querySelector('.header');
    if (header) header.style.display = 'none';
});

window.addEventListener('afterprint', function() {
    const header = document.querySelector('.header');
    if (header) header.style.display = 'block';
});

// ===== CSS Animation Keyframes (Injected) =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
    }

    .pulse {
        animation: pulse 2s ease-in-out infinite;
    }
`;
document.head.appendChild(style);