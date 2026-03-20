import { UI } from '../ui.js';

export const StopwatchCard = {
    start: 0, elapsed: 0, interval: null, isRunning: false,
    init() {
        document.getElementById('sw-toggle').addEventListener('click', () => this.toggle());
        document.getElementById('sw-reset').addEventListener('click', () => this.reset());
    },
    update() {
        let m = String(Math.floor(this.elapsed / 60000)).padStart(2, '0');
        let s = String(Math.floor((this.elapsed % 60000) / 1000)).padStart(2, '0');
        let ms = String(Math.floor((this.elapsed % 1000) / 10)).padStart(2, '0');
        document.getElementById('sw-display').innerText = `${m}:${s}.${ms}`;
    },
    toggle() {
        if(this.isRunning) {
            clearInterval(this.interval);
            document.getElementById('sw-toggle').innerText = "Resume";
        } else {
            this.start = Date.now() - this.elapsed;
            this.interval = setInterval(() => {
                this.elapsed = Date.now() - this.start;
                this.update();
            }, 10);
            document.getElementById('sw-toggle').innerText = "Pause";
        }
        this.isRunning = !this.isRunning;
    },
    reset() {
        clearInterval(this.interval);
        this.isRunning = false;
        this.elapsed = 0;
        this.update();
        document.getElementById('sw-toggle').innerText = "Start";
    }
}
