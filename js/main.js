// Menu Toggle
document.getElementById('menuToggle').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('active');
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Update moon/sun icon
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    // Save preference
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Search Functionality
const searchBox = document.querySelector('.search-box input');
searchBox.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const tutorialLinks = document.querySelectorAll('.tutorial-nav a');
    
    tutorialLinks.forEach(link => {
        const text = link.textContent.toLowerCase();
        link.parentElement.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
});
