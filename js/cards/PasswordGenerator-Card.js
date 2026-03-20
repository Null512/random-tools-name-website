import { UI } from '../ui.js'; // Import UI so we can use toasts

export const PasswordGeneratorCard = {
    init() {
        const triggers = ['pass-len', 'pass-up', 'pass-low', 'pass-num', 'pass-sym'];
        triggers.forEach(id => {
            document.getElementById(id).addEventListener('input', (e) => {
                if(id === 'pass-len') document.getElementById('pass-len-val').innerText = e.target.value;
                this.generate();
            });
        });
        document.getElementById('pass-regen').addEventListener('click', () => this.generate());
        this.generate();
    },
    generate() {
        const len = parseInt(document.getElementById('pass-len').value);
        let pool = ''; let poolSize = 0;
        if(document.getElementById('pass-up').checked) { pool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; poolSize += 26; }
        if(document.getElementById('pass-low').checked) { pool += 'abcdefghijklmnopqrstuvwxyz'; poolSize += 26; }
        if(document.getElementById('pass-num').checked) { pool += '0123456789'; poolSize += 10; }
        if(document.getElementById('pass-sym').checked) { pool += '!@#$%^&*()_+~`|}{[]:;?><,./-='; poolSize += 32; }

        if(pool === '') return document.getElementById('pass-res').innerText = 'Select a type!';

        let pass = '';
        let array = new Uint32Array(len);
        window.crypto.getRandomValues(array);
        for(let i=0; i<len; i++) pass += pool[array[i] % pool.length];

        document.getElementById('pass-res').innerText = pass;
        let entropy = Math.round(len * Math.log2(poolSize));
        document.getElementById('pass-entropy').innerText = `Entropy: ~${entropy} bits ` + (entropy < 50 ? '🔴' : entropy < 80 ? '🟡' : '🟢');
    }
}
