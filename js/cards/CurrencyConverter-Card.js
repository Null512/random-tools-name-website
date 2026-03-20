import { UI } from '../ui.js';

export const CurrencyConverterCard = {
    rates: {},
    currencies: ['USD','EUR','GBP','RUB','JPY','AUD','CAD','CHF','CNY','BTC','ETH','XMR','USDT'],
    async init() {
        const fromSel = document.getElementById('curr-from');
        const toSel = document.getElementById('curr-to');
        this.currencies.forEach(c => {
            fromSel.innerHTML += `<option value="${c}">${c}</option>`;
            toSel.innerHTML += `<option value="${c}">${c}</option>`;
        });
        toSel.value = 'EUR';

        document.getElementById('curr-val').addEventListener('input', () => this.convert());
        fromSel.addEventListener('change', () => this.convert());
        toSel.addEventListener('change', () => this.convert());
        document.getElementById('curr-swap').addEventListener('click', () => {
            [fromSel.value, toSel.value] = [toSel.value, fromSel.value];
            this.convert();
        });

        try {
            let fiatRes = await fetch('https://open.er-api.com/v6/latest/USD');
            let fiatData = await fiatRes.json();
            this.rates = { ...fiatData.rates };

            let cryptoRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,monero,tether&vs_currencies=usd');
            let cryptoData = await cryptoRes.json();
            this.rates['BTC'] = 1 / cryptoData.bitcoin.usd;
            this.rates['ETH'] = 1 / cryptoData.ethereum.usd;
            this.rates['XMR'] = 1 / cryptoData.monero.usd;
            this.rates['USDT'] = 1 / cryptoData.tether.usd;

            document.getElementById('curr-status').innerText = "Live rates loaded.";
            this.convert();
        } catch(e) {
            document.getElementById('curr-status').innerText = "Failed to load rates.";
        }
    },
    convert() {
        if(!this.rates['USD']) return;
        let val = parseFloat(document.getElementById('curr-val').value);
        let from = document.getElementById('curr-from').value;
        let to = document.getElementById('curr-to').value;
        if(isNaN(val)) return;

        let inUSD = val / this.rates[from];
        let res = inUSD * this.rates[to];
        document.getElementById('curr-res').innerText = res.toFixed(6) + " " + to;
    }
}
