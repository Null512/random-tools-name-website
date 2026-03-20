import { UI } from './ui.js';

// Import all your individual cards
import { PasswordGeneratorCard } from './cards/PasswordGenerator-Card.js';
import { QRGeneratorCard } from './cards/QRGenerator-Card.js';
import { BaseConverterCard } from './cards/BaseConverter-Card.js';
import { CaseConverterCard } from './cards/CaseConverter-Card.js';
import { GibberishFixerCard } from './cards/GibberishFixer-Card.js';
import { UnitConverterCard } from './cards/UnitConverter-Card.js';
import { WordCounterCard } from './cards/WordCounter-Card.js';
import { UnixEpochTimeCard } from './cards/UnixEpochTime-Card.js';
import { CurrencyConverterCard } from './cards/CurrencyConverter-Card.js';
import { StopwatchCard } from './cards/Stopwatch-Card.js';
import { TimerCard } from './cards/Timer-Card.js';
import { WorldClockCard } from './cards/WorldClock-Card.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Global UI
    UI.init();

    // 2. Register your cards
    const activeCards = [
        PasswordGeneratorCard,
        QRGeneratorCard,
        BaseConverterCard,
        CaseConverterCard,
        GibberishFixerCard,
        UnitConverterCard,
        WordCounterCard,
        UnixEpochTimeCard,
        CurrencyConverterCard,
        StopwatchCard,
        TimerCard,
        WorldClockCard,
    ];

    // 3. Boot them up safely
    activeCards.forEach(card => {
        if (typeof card.init === 'function') {
            try {
                card.init();
            } catch (err) {
                console.error("Failed to load a card:", err);
            }
        }
    });
});
