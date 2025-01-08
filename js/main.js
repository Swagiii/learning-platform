document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved theme preference or system preference
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark.matches)) {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
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

    // Interactive Code Editor
    const tryButtons = document.querySelectorAll('.try-btn');
    tryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.previousElementSibling.querySelector('code');
            const code = codeBlock.textContent.trim();
            
            // Create popup editor
            const editorWindow = window.open('', '_blank', 'width=800,height=600');
            editorWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Code Editor</title>
                    <style>
                        body { margin: 0; font-family: system-ui; background: #1e1e1e; color: #fff; }
                        .editor-container { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; padding: 1rem; height: 100vh; }
                        .code-panel { display: flex; flex-direction: column; }
                        textarea { width: 100%; height: 100%; background: #2d2d2d; color: #fff; border: none; padding: 1rem; font-family: monospace; }
                        .preview { background: white; border: none; width: 100%; height: 100%; }
                        .run-btn { background: #4CAF50; color: white; border: none; padding: 0.5rem; cursor: pointer; margin-top: 0.5rem; }
                    </style>
                </head>
                <body>
                    <div class="editor-container">
                        <div class="code-panel">
                            <textarea id="codeEditor">${code}</textarea>
                            <button class="run-btn" onclick="runCode()">Run Code</button>
                        </div>
                        <iframe class="preview" id="preview"></iframe>
                    </div>
                    <script>
                        function runCode() {
                            const code = document.getElementById('codeEditor').value;
                            const preview = document.getElementById('preview');
                            preview.srcdoc = code;
                        }
                        // Initial run
                        runCode();
                    </script>
                </body>
                </html>
            `);
        });
    });

    // Navigation Functions
    const pages = [
        '/tutorials/html/introduction.html',
        '/tutorials/html/basics.html',
        '/tutorials/html/elements.html',
        '/tutorials/html/attributes.html'
    ];

    function getCurrentPageIndex() {
        const currentPath = window.location.pathname;
        return pages.findIndex(page => currentPath.endsWith(page));
    }

    function prevPage() {
        const currentIndex = getCurrentPageIndex();
        if (currentIndex > 0) {
            window.location.href = pages[currentIndex - 1];
        }
    }

    function nextPage() {
        const currentIndex = getCurrentPageIndex();
        if (currentIndex < pages.length - 1) {
            window.location.href = pages[currentIndex + 1];
        }
    }

    // Hide arrows on index page
    if (window.location.pathname.endsWith('index.html')) {
        document.querySelector('.page-navigation').style.display = 'none';
    }

    // Update arrow visibility based on current page
    function updateArrowVisibility() {
        const currentIndex = getCurrentPageIndex();
        const prevArrow = document.querySelector('.nav-arrow.prev');
        const nextArrow = document.querySelector('.nav-arrow.next');
        
        if (prevArrow && nextArrow) {
            prevArrow.style.display = currentIndex <= 0 ? 'none' : 'flex';
            nextArrow.style.display = currentIndex >= pages.length - 1 ? 'none' : 'flex';
        }
    }

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

    // Update progress when page is read
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
            updateProgress();
        }
    });

    // Initialize
    updateArrowVisibility();
    updateUI();
});
