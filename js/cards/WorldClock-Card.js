import { UI } from '../ui.js';

export const WorldClockCard = {
    init() {
        document.getElementById('clock-region').addEventListener('change', () => this.update());
        setInterval(() => this.update(), 1000);
        this.update();
    },
    update() {
        const region = document.getElementById('clock-region').value;
        const now = new Date();
        let optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        let optionsDate = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        if(region !== 'local') { optionsTime.timeZone = region; optionsDate.timeZone = region; }
        document.getElementById('clock-time').innerText = now.toLocaleTimeString('en-US', optionsTime);
        document.getElementById('clock-date').innerText = now.toLocaleDateString('en-US', optionsDate);
    }
}
