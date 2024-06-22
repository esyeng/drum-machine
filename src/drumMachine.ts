import { Howl, HowlOptions } from 'howler';

interface DrumPad {
    name: string;
    sound: string;
    key: string;
}

export class DrumMachine {
    private pads: DrumPad[];
    private container: HTMLElement | null;
    private buttons: HTMLButtonElement[] = [];

    constructor(containerId: string) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error(`Container with id "${containerId}" not found`);
        }
        this.pads = [
            { name: 'Kick', sound: 'https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Kicks/24[kb]bonger-kick.wav.mp3', key: 'A' },
            { name: 'Snare', sound: 'https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/snare.wav', key: 'B' },
            { name: 'Hi-Hat', sound: 'https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/hihat.wav', key: 'C' },
            { name: 'Tom', sound: 'https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/tom.wav', key: 'D' },
            { name: 'Clap', sound: 'https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/clap.wav', key: 'E' },
            { name: 'Ride', sound: 'https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/ride.wav', key: 'F' },
            { name: 'Tink', sound: 'https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/tink.wav', key: 'G' },
            { name: 'Crash', sound: 'https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/openhat.wav', key: 'H' },
        ];
        this.createPads();
        this.setupKeyboardListeners();
    }

    private createPads(): void {
        this.pads.forEach((pad) => {
            const button = document.createElement('button');
            button.textContent = `${pad.name} (${pad.key})`;
            button.className = 'drum-pad';
            button.dataset.key = pad.key;
            button.addEventListener('click', () => this.playSound(pad.sound));
            this.container!.appendChild(button);
            this.buttons.push(button);
        });
        console.log(`Created ${this.pads.length} drum pads`);
    }

    private setupKeyboardListeners(): void {
        document.addEventListener('keydown', (event) => {
            const key = event.key.toUpperCase();
            const pad = this.pads.find(p => p.key === key);
            if (pad) {
                this.playSound(pad.sound);
                this.animatePad(pad.key);
            }
        });
    }

    private playSound(soundUrl: string): void {
        const options: HowlOptions = {
            src: [soundUrl],
            html5: true,
        };
        const sound = new Howl(options);
        sound.play();
        console.log(`Playing sound: ${soundUrl}`);
    }

    private animatePad(key: string): void {
        const button = this.buttons.find(btn => btn.dataset.key === key);
        if (button) {
            button.classList.add('active');
            setTimeout(() => {
                button.classList.remove('active');
            }, 100);
        }
    }
}
