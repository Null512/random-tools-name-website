import { UI } from '../ui.js';

export const UnixEpochTimeCard = {
    init() {
        document.getElementById('unix-input').addEventListener('input', () => this.convert());
        document.getElementById('unix-now').addEventListener('click', () => {
            document.getElementById('unix-input').value = Math.floor(Date.now()/1000);
            this.convert();
        });
    },
    convert() {
        const val = parseInt(document.getElementById('unix-input').value);
        if(isNaN(val)) return;
        const date = new Date(val * 1000);
        document.getElementById('unix-res').innerText = date.toUTCString() + "\n" + date.toLocaleString();
    }
}
