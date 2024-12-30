// theme.js
const ThemeHandler = {
    themes: {
        CLASSIC: '#FFFFEC',
        MINT: '#E0FFE0',
        SAKURA: '#FFE0E0',
        SKY: '#E0E0FF'
    },

    init() {
        // Set initial theme from localStorage
        const savedTheme = localStorage.getItem('forumTheme');
        if (savedTheme) {
            this.setTheme(savedTheme);
        }
        
        // Update color picker to match current theme
        const colorPicker = document.getElementById('bgcolor');
        if (colorPicker) {
            colorPicker.value = savedTheme || this.themes.CLASSIC;
        }
        
        // Setup event listeners
        this.setupEventListeners();
    },

    setTheme(color) {
        document.documentElement.style.setProperty('--bg-color', color);
        localStorage.setItem('forumTheme', color);
        
        // Update color picker if it exists
        const colorPicker = document.getElementById('bgcolor');
        if (colorPicker) {
            colorPicker.value = color;
        }
    },

    setupEventListeners() {
        // Theme buttons
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const themeColor = e.target.dataset.theme;
                if (themeColor) {
                    this.setTheme(themeColor);
                }
            });
        });

        // Color picker
        const colorPicker = document.getElementById('bgcolor');
        if (colorPicker) {
            colorPicker.addEventListener('input', (e) => {
                this.setTheme(e.target.value);
            });
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => ThemeHandler.init());
