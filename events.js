// ===== Events View Toggle =====
document.addEventListener('DOMContentLoaded', function() {
    setupViewToggle();
    setupEventItemListeners();
    setupRegisterButton();
    animateEventElements();
});

// ===== View Toggle Setup =====
function setupViewToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const calendarView = document.getElementById('calendar-view');
    const listView = document.getElementById('list-view');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const viewType = this.getAttribute('data-view');

            // Update active button
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Toggle views
            if (viewType === 'calendar') {
                calendarView.style.display = 'grid';
                listView.style.display = 'none';
                calendarView.style.animation = 'fadeIn 0.5s ease';
            } else if (viewType === 'list') {
                calendarView.style.display = 'none';
                listView.style.display = 'block';
                listView.style.animation = 'fadeIn 0.5s ease';
            }

            // Track view change
            trackEvent('events_view_toggle', { view: viewType });
        });
    });
}

// ===== Event Item Listeners =====
function setupEventItemListeners() {
    const eventItems = document.querySelectorAll('.event-item');
    const eventRows = document.querySelectorAll('.event-list-table tbody tr');

    // Calendar view event items
    eventItems.forEach(item => {
        item.addEventListener('click', function() {
            const eventName = this.querySelector('.event-name').textContent;
            const eventDate = this.querySelector('.event-date').textContent;
            console.log('Event clicked:', eventName, eventDate);
            trackEvent('event_click', { event: eventName, date: eventDate });
            // In a real app, navigate to event details
        });
    });

    // List view event rows
    eventRows.forEach(row => {
        row.addEventListener('click', function(e) {
            if (!e.target.classList.contains('view-link')) {
                const eventName = this.querySelector('strong').textContent;
                console.log('Event row clicked:', eventName);
                trackEvent('event_row_click', { event: eventName });
            }
        });
        row.style.cursor = 'pointer';
    });
}

// ===== Register Button Setup =====
function setupRegisterButton() {
    const registerBtn = document.querySelector('.event-action .btn-primary');
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            console.log('Registration clicked for WCA Championship Qualifier');
            trackEvent('event_register_click', { event: 'WCA Championship Qualifier' });
            showNotification('Registration coming soon! Stay tuned.', 'info');
        });
    }

    const learnMoreBtn = document.querySelector('.event-action .btn-secondary');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            console.log('Learn more clicked');
            trackEvent('event_learn_more_click', { event: 'WCA Championship Qualifier' });
        });
    }
}

// ===== Animate Event Elements on Scroll =====
function animateEventElements() {
    const eventItems = document.querySelectorAll('.event-item');
    const summaryCards = document.querySelectorAll('.summary-card');
    const allElements = [...eventItems, ...summaryCards];

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

    allElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
}

// ===== Add CSS Styles for Events Page =====
const eventsStyles = document.createElement('style');
eventsStyles.textContent = `
    /* Event List Table */
    .event-list-table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .event-list-table thead {
        background-color: var(--primary-dark);
        color: white;
    }

    .event-list-table th {
        padding: 1.2rem 1rem;
        text-align: left;
        font-weight: 600;
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
    }

    .event-list-table th:last-child {
        border-right: none;
    }

    .event-list-table tbody tr {
        border-bottom: 1px solid var(--border-light);
        transition: all 0.3s ease;
    }

    .event-list-table tbody tr:hover {
        background-color: rgba(139, 58, 58, 0.03);
    }

    .event-list-table td {
        padding: 1rem;
        vertical-align: middle;
    }

    .event-details-section {
        margin-top: 5rem;
        padding: 3rem 0;
        border-top: 2px solid var(--border-light);
    }

    .event-details-section h2 {
        text-align: center;
        margin-bottom: 2rem;
    }

    .featured-event {
        background: white;
        padding: 2.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .event-detail-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 2px solid var(--border-light);
    }

    .event-detail-info h3 {
        font-size: 1.8rem;
        color: var(--primary-dark);
        margin-bottom: 0.5rem;
    }

    .event-detail-date {
        font-size: 1rem;
        font-weight: 600;
        color: var(--burgundy);
        margin-bottom: 0.3rem;
    }

    .event-detail-location {
        font-size: 0.95rem;
        color: var(--text-light);
    }

    .event-detail-status {
        display: flex;
        gap: 1rem;
    }

    .event-detail-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
    }

    .detail-card {
        background-color: rgba(139, 58, 58, 0.05);
        padding: 1.5rem;
        border-radius: 6px;
        border-left: 4px solid var(--burgundy);
    }

    .detail-card h4 {
        color: var(--primary-dark);
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .detail-card p {
        color: var(--text-dark);
        font-weight: 600;
        font-size: 0.95rem;
    }

    .event-description {
        margin-bottom: 2rem;
    }

    .event-description h4 {
        color: var(--primary-dark);
        margin-bottom: 1rem;
    }

    .event-description p {
        color: var(--text-light);
        line-height: 1.8;
        margin-bottom: 1rem;
    }

    .event-action {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .event-action .btn {
        flex: 1;
        min-width: 150px;
    }

    /* Upcoming Summary */
    .upcoming-summary {
        margin-top: 5rem;
        padding: 3rem 0;
        border-top: 2px solid var(--border-light);
    }

    .upcoming-summary h2 {
        text-align: center;
        margin-bottom: 2rem;
    }

    .summary-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
    }

    .summary-card {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        border-top: 4px solid var(--burgundy);
        transition: all 0.3s ease;
    }

    .summary-card:hover {
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        transform: translateY(-6px);
    }

    .summary-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    .summary-card h4 {
        color: var(--primary-dark);
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
    }

    .summary-card p {
        color: var(--text-light);
        margin-bottom: 0.5rem;
    }

    .summary-desc {
        font-size: 0.85rem;
        font-style: italic;
        color: var(--burgundy);
        font-weight: 600;
    }

    @media (max-width: 768px) {
        .event-detail-header {
            flex-direction: column;
            gap: 1rem;
        }

        .event-detail-grid {
            grid-template-columns: repeat(2, 1fr);
        }

        .event-action {
            flex-direction: column;
        }

        .event-action .btn {
            width: 100%;
        }

        .summary-cards {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 480px) {
        .featured-event {
            padding: 1.5rem;
        }

        .event-detail-grid {
            grid-template-columns: 1fr;
        }

        .summary-cards {
            grid-template-columns: 1fr;
        }

        .event-list-table {
            font-size: 0.8rem;
        }

        .event-list-table th,
        .event-list-table td {
            padding: 0.6rem 0.4rem;
        }
    }
`;

document.head.appendChild(eventsStyles);

// ===== Keyboard Shortcuts for Events =====
document.addEventListener('keydown', function(event) {
    // Press 'c' to switch to calendar view
    if (event.key === 'c' && !event.ctrlKey && !event.metaKey) {
        const calendarBtn = document.querySelector('[data-view="calendar"]');
        if (calendarBtn && document.activeElement !== calendarBtn) {
            calendarBtn.click();
        }
    }

    // Press 'l' to switch to list view
    if (event.key === 'l' && !event.ctrlKey && !event.metaKey) {
        const listBtn = document.querySelector('[data-view="list"]');
        if (listBtn && document.activeElement !== listBtn) {
            listBtn.click();
        }
    }
});