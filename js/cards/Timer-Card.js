import { UI } from '../ui.js';

export const TimerCard = {
    interval: null, remaining: 0, isRunning: false,

    init() {
        document.getElementById('tm-toggle').addEventListener('click', () => this.toggle());
        document.getElementById('tm-reset').addEventListener('click', () => this.reset());

        document.getElementById('tm-min').addEventListener('input', () => { if(!this.isRunning) this.reset(); });
        document.getElementById('tm-sec').addEventListener('input', () => { if(!this.isRunning) this.reset(); });
        this.reset();
    },
    updateDisplay(seconds) {
        let m = String(Math.floor(seconds / 60)).padStart(2, '0');
        let s = String(seconds % 60).padStart(2, '0');
        document.getElementById('tm-display').innerText = `${m}:${s}`;
    },
    toggle() {
        if(this.isRunning) {
            clearInterval(this.interval);
            document.getElementById('tm-toggle').innerText = "Resume";
        } else {
            if(this.remaining === 0) {
                let m = parseInt(document.getElementById('tm-min').value) || 0;
                let s = parseInt(document.getElementById('tm-sec').value) || 0;
                this.remaining = (m * 60) + s;
            }
            if(this.remaining <= 0) return;

            this.interval = setInterval(() => {
                this.remaining--;
                this.updateDisplay(this.remaining);
                if(this.remaining <= 0) {
                    clearInterval(this.interval);
                    this.isRunning = false;
                    document.getElementById('tm-toggle').innerText = "Start";
                    UI.showToast("Timer finished!");
                }
            }, 1000);
            document.getElementById('tm-toggle').innerText = "Pause";
        }
        this.isRunning = !this.isRunning;
    },
    reset() {
        clearInterval(this.interval);
        this.isRunning = false;
        let m = parseInt(document.getElementById('tm-min').value) || 0;
        let s = parseInt(document.getElementById('tm-sec').value) || 0;
        this.remaining = (m * 60) + s;
        this.updateDisplay(this.remaining);
        document.getElementById('tm-toggle').innerText = "Start";
    }
};
