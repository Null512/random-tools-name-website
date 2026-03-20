import { UI } from '../ui.js';

export const WordCounterCard = {
    init() {
        document.getElementById('word-input').addEventListener('input', (e) => {
            const text = e.target.value;
            document.getElementById('wc-chars').innerText = text.length;
            document.getElementById('wc-words').innerText = text.trim() ? text.trim().split(/\s+/).length : 0;
            document.getElementById('wc-lines').innerText = text.split(/\r\n|\r|\n/).length;
        });
    }
}
