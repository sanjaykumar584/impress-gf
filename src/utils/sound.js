// Simple sound synthesizer using Web Audio API
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const playTone = (freq, type, duration, vol = 0.1) => {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
};

export const playSound = (type) => {
    if (!audioCtx) return;

    switch (type) {
        case 'click': // Squeak/Pop
            playTone(800, 'sine', 0.1, 0.1);
            setTimeout(() => playTone(1200, 'sine', 0.1, 0.1), 50);
            break;

        case 'pop':
            playTone(600, 'triangle', 0.1, 0.1);
            break;

        case 'yay': // Major arpeggio
            playTone(523.25, 'sine', 0.3, 0.1); // C5
            setTimeout(() => playTone(659.25, 'sine', 0.3, 0.1), 100); // E5
            setTimeout(() => playTone(783.99, 'sine', 0.4, 0.1), 200); // G5
            setTimeout(() => playTone(1046.50, 'sine', 0.6, 0.1), 300); // C6
            break;

        case 'sad': // Descending minor
            playTone(880, 'sine', 0.4, 0.1); // A5
            setTimeout(() => playTone(830.61, 'sine', 0.4, 0.1), 200); // G#5
            setTimeout(() => playTone(783.99, 'sine', 0.6, 0.1), 400); // G5
            break;

        case 'boing':
            if (audioCtx.state === 'suspended') audioCtx.resume();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(200, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.3);
            break;

        default:
            break;
    }
};
