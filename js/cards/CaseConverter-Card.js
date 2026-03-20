import { UI } from '../ui.js';

export const CaseConverterCard = {
    init() {
        document.getElementById('case-up').addEventListener('click', () => this.convert('upper'));
        document.getElementById('case-low').addEventListener('click', () => this.convert('lower'));
        document.getElementById('case-title').addEventListener('click', () => this.convert('title'));
    },
    convert(type) {
        let el = document.getElementById('case-input');
        if(type === 'upper') el.value = el.value.toUpperCase();
        if(type === 'lower') el.value = el.value.toLowerCase();
        if(type === 'title') el.value = el.value.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
}
