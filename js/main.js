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

    // Code Editor Functionality
    const tryButtons = document.querySelectorAll('.try-btn');
    tryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.previousElementSibling.querySelector('code');
            const code = codeBlock.textContent.trim();
            
            const editorWindow = window.open('', '_blank', 'width=800,height=600');
            editorWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Code Editor</title>
                    <style>
                        body { margin: 0; font-family: system-ui; background: #1e1e1e; }
                        .editor-container { display: grid; grid-template-columns: 1fr 1fr; height: 100vh; }
                        .code-panel { display: flex; flex-direction: column; padding: 1rem; }
                        textarea { 
                            width: 100%; 
                            height: calc(100vh - 100px); 
                            background: #2d2d2d; 
                            color: #fff; 
                            border: none; 
                            padding: 1rem; 
                            font-family: monospace;
                            font-size: 14px;
                        }
                        .preview { 
                            background: white; 
                            height: 100vh; 
                            border: none;
                        }
                        .run-btn {
                            background: #2563eb;
                            color: white;
                            border: none;
                            padding: 1rem;
                            cursor: pointer;
                            margin-top: 1rem;
                        }
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
