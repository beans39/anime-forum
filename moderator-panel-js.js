// Moderator Panel JavaScript

const ModeratorPanel = {
    // Configuration and state
    state: {
        activeSection: 'Dashboard',
        reports: [
            {
                id: 1,
                content: "This content violates forum rules...",
                reportedBy: "User123",
                thread: "Anime Discussion",
                time: "5 minutes ago",
                type: "post"
            },
            {
                id: 2,
                content: "Spamming multiple threads",
                reportedBy: "Mod1",
                thread: "SpamBot",
                time: "15 minutes ago",
                type: "user"
            }
        ],
        recentActions: [
            {
                id: 1,
                action: "Warning issued to User456",
                by: "Moderator1",
                reason: "Inappropriate language",
                time: "1 hour ago"
            },
            {
                id: 2,
                action: "Thread locked: \"Controversial Discussion\"",
                by: "Moderator2",
                reason: "Off-topic derailment",
                time: "2 hours ago"
            }
        ]
    },

    // Initialize the moderator panel
    init() {
        this.cacheDom();
        this.bindEvents();
        this.render();
    },

    // Cache DOM elements
    cacheDom() {
        this.sidebarMenu = document.querySelector('.mod-menu');
        this.mainContent = document.querySelector('.mod-main');
    },

    // Bind events
    bindEvents() {
        // Sidebar menu item click events
        this.sidebarMenu.addEventListener('click', (e) => {
            if (e.target.matches('.mod-menu a')) {
                e.preventDefault();
                const section = e.target.textContent;
                this.setActiveSection(section);
            }
        });

        // Report action buttons
        this.mainContent.addEventListener('click', (e) => {
            if (e.target.matches('.report-actions .action-btn')) {
                const action = e.target.textContent.toLowerCase();
                const reportItem = e.target.closest('.report-item');
                this.handleReportAction(action, reportItem);
            }
        });
    },

    // Set active section in sidebar
    setActiveSection(section) {
        // Remove active class from all menu items
        this.sidebarMenu.querySelectorAll('a').forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to selected section
        const selectedItem = Array.from(this.sidebarMenu.querySelectorAll('a'))
            .find(item => item.textContent === section);
        
        if (selectedItem) {
            selectedItem.classList.add('active');
        }

        // Update state
        this.state.activeSection = section;

        // Render content based on active section
        this.renderSectionContent();
    },

    // Render section content
    renderSectionContent() {
        // Placeholder for different section rendering
        // In a real app, this would load different content dynamically
        switch(this.state.activeSection) {
            case 'Dashboard':
                this.renderDashboard();
                break;
            case 'Reported Content':
                this.renderReportedContent();
                break;
            // Add more cases for other sections
            default:
                this.renderDashboard();
        }
    },

    // Render initial dashboard
    renderDashboard() {
        const dashboardContent = `
            <div class="mod-panel">
                <h2 class="mod-panel-header">Moderation Overview</h2>
                <div class="mod-panel-content">
                    <div class="mod-stats">
                        <div class="stat-box">
                            <div class="stat-number">${this.state.reports.length}</div>
                            <div class="stat-label">Reports Pending</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-number">5</div>
                            <div class="stat-label">Users Warned Today</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-number">3</div>
                            <div class="stat-label">Active Bans</div>
                        </div>
                    </div>

                    ${this.renderReportList()}
                    ${this.renderWarningHistory()}
                </div>
            </div>
        `;

        this.mainContent.innerHTML = dashboardContent;
    },

    // Render report list
    renderReportList() {
        const reportsHtml = this.state.reports.map(report => `
            <div class="report-item">
                <div>${report.content}</div>
                <div class="report-meta">
                    Reported by: ${report.reportedBy} | ${report.type === 'post' ? `Thread: ${report.thread}` : `User: ${report.thread}`} | ${report.time}
                </div>
                <div class="report-actions">
                    <button class="action-btn">View</button>
                    <button class="action-btn warning">Warn</button>
                    <button class="action-btn">Delete</button>
                    <button class="action-btn ban">Ban</button>
                </div>
            </div>
        `).join('');

        return `
            <div class="report-list">
                <h3 class="mod-panel-header">Recent Reports</h3>
                ${reportsHtml}
            </div>
        `;
    },

    // Render warning history
    renderWarningHistory() {
        const actionsHtml = this.state.recentActions.map(action => `
            <div class="warning-item">
                <div>${action.action}</div>
                <div class="report-meta">
                    By: ${action.by} | Reason: ${action.reason} | ${action.time}
                </div>
            </div>
        `).join('');

        return `
            <div class="warning-history">
                <h3 class="mod-panel-header">Recent Actions</h3>
                ${actionsHtml}
            </div>
        `;
    },

    // Render reported content section
    renderReportedContent() {
        // Placeholder for reported content view
        this.mainContent.innerHTML = `
            <div class="mod-panel">
                <h2 class="mod-panel-header">Reported Content</h2>
                <div class="mod-panel-content">
                    ${this.renderReportList()}
                </div>
            </div>
        `;
    },

    // Handle report actions
    handleReportAction(action, reportElement) {
        switch(action) {
            case 'view':
                // Implement view logic
                console.log('Viewing report');
                break;
            case 'warn':
                // Implement warning logic
                console.log('Warning user');
                reportElement.classList.add('warned');
                break;
            case 'delete':
                // Implement delete logic
                console.log('Deleting content');
                reportElement.remove();
                break;
            case 'ban':
                // Implement ban logic
                console.log('Banning user');
                reportElement.classList.add('banned');
                break;
        }
    },

    // Render the entire panel
    render() {
        this.renderDashboard();
    }
};

// Initialize the moderator panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    ModeratorPanel.init();
});

// Theme handling (integrated from previous theme script)
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
                const themeColor = e.target.dataset.theme || 
                    this.themes[e.target.textContent.toUpperCase()] || 
                    this.themes.CLASSIC;
                this.setTheme(themeColor);
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

// Initialize theme handler
document.addEventListener('DOMContentLoaded', () => {
    ThemeHandler.init();
});
