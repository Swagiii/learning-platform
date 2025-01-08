document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', newTheme);
    });

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

    // Code Editor Functionality within the same box
    const tryButtons = document.querySelectorAll('.try-btn');
    tryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.previousElementSibling.querySelector('code');
            const code = codeBlock.textContent.trim();

            // Creating a new div to hold the code editor and output
            const editorContainer = document.createElement('div');
            editorContainer.classList.add('editor-container');

            // Creating the code editor textarea
            const textarea = document.createElement('textarea');
            textarea.value = code;
            textarea.style.width = '100%';
            textarea.style.height = '200px';
            textarea.style.background = '#2d2d2d';
            textarea.style.color = '#fff';
            textarea.style.border = 'none';
            textarea.style.padding = '1rem';
            textarea.style.fontFamily = 'monospace';
            textarea.style.fontSize = '14px';

            // Creating the run button
            const runButton = document.createElement('button');
            runButton.textContent = 'Run Code';
            runButton.style.background = '#ff5722';
            runButton.style.color = '#fff';
            runButton.style.border = 'none';
            runButton.style.padding = '1rem';
            runButton.style.marginTop = '1rem';
            runButton.style.cursor = 'pointer';

            // Creating the output iframe
            const outputIframe = document.createElement('iframe');
            outputIframe.style.width = '100%';
            outputIframe.style.height = '200px';
            outputIframe.style.background = '#fff';
            outputIframe.style.border = 'none';
            outputIframe.style.marginTop = '1rem';

            // Append textarea, run button, and output iframe to the container
            editorContainer.appendChild(textarea);
            editorContainer.appendChild(runButton);
            editorContainer.appendChild(outputIframe);

            // Insert the editor container after the try button
            this.parentElement.appendChild(editorContainer);

            // Add event listener to run the code
            runButton.addEventListener('click', () => {
                outputIframe.srcdoc = textarea.value;
            });
        });
    });

    // Progress Tracking
    const progress = JSON.parse(localStorage.getItem('progress') || '{}');
    
    function updateProgress() {
        const currentPath = window.location.pathname;
        progress[currentPath] = true;
        localStorage.setItem('progress', JSON.stringify(progress));
        updateUI();
    }

    function updateUI() {
        document.querySelectorAll('.chapter-list li a').forEach(link => {
            const path = link.getAttribute('href');
            if (progress[path]) {
                link.parentElement.classList.add('completed');
            }
        });
    }

    // Initialize UI
    updateUI();
});
