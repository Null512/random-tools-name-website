import { UI } from '../ui.js';

export const BaseConverterCard = {
    init() {
        document.getElementById('base-input').addEventListener('input', () => this.convert());
        document.getElementById('base-from').addEventListener('input', () => this.convert());
        document.getElementById('base-to').addEventListener('input', () => this.convert());
        document.getElementById('base-swap').addEventListener('click', () => this.swap());
    },
    swap() {
        const fromInput = document.getElementById('base-from');
        const toInput = document.getElementById('base-to');
        [fromInput.value, toInput.value] = [toInput.value, fromInput.value];
        this.convert();
    },
    convert() {
        const val = document.getElementById('base-input').value;
        const from = parseInt(document.getElementById('base-from').value);
        const to = parseInt(document.getElementById('base-to').value);
        if(!val || isNaN(from) || isNaN(to) || from < 2 || from > 36 || to < 2 || to > 36) return;
        try {
            let parsed = parseInt(val, from);
            if(isNaN(parsed)) throw "Invalid";
            document.getElementById('base-res').innerText = parsed.toString(to).toUpperCase();
        } catch(e) {
            document.getElementById('base-res').innerText = "Invalid input.";
        }
    }
}
