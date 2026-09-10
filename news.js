// ===== News Filter Functionality =====
document.addEventListener('DOMContentLoaded', function() {
    setupNewsFilters();
    setupNewsArticleListeners();
    animateNewsArticles();
});

// ===== Filter Setup =====
function setupNewsFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsArticles = document.querySelectorAll('.news-article');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter articles
            newsArticles.forEach(article => {
                const articleCategory = article.getAttribute('data-category');

                if (filterValue === 'all') {
                    article.style.display = 'block';
                    article.style.animation = 'fadeIn 0.5s ease';
                } else if (articleCategory === filterValue) {
                    article.style.display = 'block';
                    article.style.animation = 'fadeIn 0.5s ease';
                } else {
                    article.style.display = 'none';
                }
            });

            // Track filter action
            trackEvent('news_filter', { filter: filterValue });
        });
    });
}

// ===== Article Click Listeners =====
function setupNewsArticleListeners() {
    const newsArticles = document.querySelectorAll('.news-article');
    const readMoreLinks = document.querySelectorAll('.read-more-link');

    newsArticles.forEach(article => {
        article.addEventListener('click', function(e) {
            if (!e.target.classList.contains('read-more-link')) {
                const title = this.querySelector('.article-title').textContent;
                console.log('Article clicked:', title);
                trackEvent('news_article_click', { title: title });
            }
        });
    });

    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const title = this.closest('.news-article').querySelector('.article-title').textContent;
            console.log('Read full article:', title);
            trackEvent('news_read_full', { title: title });
            // In a real app, navigate to full article page
        });
    });
}

// ===== Animate Articles on Scroll =====
function animateNewsArticles() {
    const newsArticles = document.querySelectorAll('.news-article');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    newsArticles.forEach((article, index) => {
        article.style.opacity = '0';
        article.style.transform = 'translateY(20px)';
        article.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(article);
    });
}

// ===== Add fadeIn animation if not exists =====
const existingStyles = document.querySelectorAll('style');
let hasAnimation = false;

existingStyles.forEach(style => {
    if (style.textContent.includes('fadeIn')) {
        hasAnimation = true;
    }
});

if (!hasAnimation) {
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(animationStyle);
}