import { UI } from '../ui.js';

export const QRGeneratorCard = {
    init() {
        document.getElementById('qr-btn').addEventListener('click', () => this.generate());
    },
    generate() {
        const txt = document.getElementById('qr-text').value;
        const ecc = document.getElementById('qr-ecc').value;
        const img = document.getElementById('qr-img');
        if(!txt) return;
        img.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(txt)}&ecc=${ecc}`;
        img.style.display = 'inline-block';
    }
}
