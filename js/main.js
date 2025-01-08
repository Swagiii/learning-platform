// Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Search Functionality
    const searchInput = document.querySelector('.search input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const tutorialLinks = document.querySelectorAll('.chapter-list li a');
            
            tutorialLinks.forEach(link => {
                const text = link.textContent.toLowerCase();
                const listItem = link.parentElement;
                listItem.style.display = text.includes(searchTerm) ? 'block' : 'none';
            });
        });
    }

    // Try it Yourself Button
    const tryButtons = document.querySelectorAll('.try-btn');
    tryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.previousElementSibling;
            const code = codeBlock.textContent.trim();
            // Store code in localStorage for the editor page
            localStorage.setItem('codeToTry', code);
            window.open('../../editor.html', '_blank');
        });
    });

    // Active Link Highlighting
    const currentPage = window.location.pathname;
    const links = document.querySelectorAll('.chapter-list a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage.split('/').pop()) {
            link.parentElement.classList.add('active');
        }
    });
});

// Track Progress
function saveProgress(chapterName) {
    let progress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    progress[chapterName] = true;
    localStorage.setItem('courseProgress', JSON.stringify(progress));
    updateProgressUI();
}

function updateProgressUI() {
    const progress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    const chapters = document.querySelectorAll('.chapter-list li');
    chapters.forEach(chapter => {
        const link = chapter.querySelector('a');
        const chapterName = link.getAttribute('href').split('.')[0];
        if (progress[chapterName]) {
            chapter.classList.add('completed');
        }
    });
}
