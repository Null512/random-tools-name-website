import { UI } from '../ui.js';

export const UnitConverterCard = {
    data: {
        length: { m:1, km:1000, cm:0.01, mm:0.001, mi:1609.34, yd:0.9144, ft:0.3048, in:0.0254 },
        mass: { kg:1, g:0.001, mg:0.000001, lb:0.453592, oz:0.0283495 },
        temp: { c:'C', f:'F', k:'K' }
    },
    init() {
        document.getElementById('unit-type').addEventListener('change', () => this.updateOptions());
        document.getElementById('unit-val').addEventListener('input', () => this.convert());
        document.getElementById('unit-from').addEventListener('change', () => this.convert());
        document.getElementById('unit-to').addEventListener('change', () => this.convert());
        document.getElementById('unit-swap').addEventListener('click', () => {
            const from = document.getElementById('unit-from');
            const to = document.getElementById('unit-to');
            [from.value, to.value] = [to.value, from.value];
            this.convert();
        });
        this.updateOptions();
    },
    updateOptions() {
        const type = document.getElementById('unit-type').value;
        const opts = Object.keys(this.data[type]).map(k => `<option value="${k}">${k}</option>`).join('');
        document.getElementById('unit-from').innerHTML = opts;
        document.getElementById('unit-to').innerHTML = opts;
        if(type === 'length') document.getElementById('unit-to').value = 'ft';
        if(type === 'mass') document.getElementById('unit-to').value = 'lb';
        if(type === 'temp') document.getElementById('unit-to').value = 'f';
        this.convert();
    },
    convert() {
        const type = document.getElementById('unit-type').value;
        let val = parseFloat(document.getElementById('unit-val').value);
        const from = document.getElementById('unit-from').value;
        const to = document.getElementById('unit-to').value;
        if(isNaN(val)) return;

        let res = 0;
        if(type === 'temp') {
            if(from === to) res = val;
            else if(from==='c' && to==='f') res = (val * 9/5) + 32;
            else if(from==='f' && to==='c') res = (val - 32) * 5/9;
            else if(from==='c' && to==='k') res = val + 273.15;
            else if(from==='k' && to==='c') res = val - 273.15;
            else if(from==='f' && to==='k') res = (val - 32) * 5/9 + 273.15;
            else if(from==='k' && to==='f') res = (val - 273.15) * 9/5 + 32;
        } else {
            res = (val * this.data[type][from]) / this.data[type][to];
        }
        document.getElementById('unit-res').innerText = res.toPrecision(7).replace(/\.?0+$/,"");
    }
}
