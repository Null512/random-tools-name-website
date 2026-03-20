export const UI = {
    init() {
        this.setupThemes();
        this.setupFavorites();
        this.setupCopyButtons();
    },

    showToast(message = "Copied to clipboard!") {
        const toast = document.getElementById('toast');
        document.getElementById('toast-msg').innerText = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    },

    setupCopyButtons() {
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-copy');
                const el = document.getElementById(targetId);
                const text = (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') ? el.value : el.innerText;
                if (!text) return;

                // 1. Try the modern Clipboard API (Works on HTTPS and localhost)
                if (navigator.clipboard && window.isSecureContext) {
                    navigator.clipboard.writeText(text)
                        .then(() => this.showToast())
                        .catch(() => alert("Failed to copy."));
                } else {
                    // 2. Fallback for non-secure local IP testing
                    const textArea = document.createElement("textarea");
                    textArea.value = text;
                    // Hide the textarea off-screen
                    textArea.style.position = "fixed";
                    textArea.style.top = "-9999px";
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();

                    try {
                        document.execCommand('copy');
                        this.showToast();
                    } catch (err) {
                        alert("Failed to copy.");
                    }
                    document.body.removeChild(textArea);
                }
            });
        });
    },

    setupThemes() {
        const selectors = ['theme', 'contrast', 'color'];
        selectors.forEach(type => {
            const sel = document.getElementById(`${type}-sel`);
            if (localStorage.getItem(`rt-${type}`)) {
                sel.value = localStorage.getItem(`rt-${type}`);
            }
            sel.addEventListener('change', () => {
                document.documentElement.setAttribute(`data-${type}`, sel.value);
                localStorage.setItem(`rt-${type}`, sel.value);
            });
            // Trigger initial state
            document.documentElement.setAttribute(`data-${type}`, sel.value);
        });
    },

    setupFavorites() {
        // Assign indexes for sorting memory
        document.querySelectorAll('.card').forEach((card, index) => card.dataset.index = index);

        const favs = JSON.parse(localStorage.getItem('rt-favs') || '[]');
        document.querySelectorAll('.star').forEach(star => {
            const id = star.getAttribute('data-target');
            if (favs.includes(id)) star.classList.add('active');

            star.addEventListener('click', () => {
                star.classList.toggle('active');
                this.saveFavorites();
                this.sortGrid();
            });
        });
        this.sortGrid();
    },

    saveFavorites() {
        const activeFavs = Array.from(document.querySelectorAll('.star.active')).map(s => s.getAttribute('data-target'));
        localStorage.setItem('rt-favs', JSON.stringify(activeFavs));
    },

    sortGrid() {
        const container = document.getElementById('tools-container');
        const cards = Array.from(container.children);
        cards.sort((a, b) => {
            const aFav = a.querySelector('.star').classList.contains('active') ? 1 : 0;
            const bFav = b.querySelector('.star').classList.contains('active') ? 1 : 0;
            if (aFav !== bFav) return bFav - aFav;
            return parseInt(a.dataset.index) - parseInt(b.dataset.index);
        });
        cards.forEach(c => container.appendChild(c));
    }
};
