import { DrumMachine } from './drumMachine';

console.log('Script loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    try {
        const drumMachine = new DrumMachine('drum-machine');
        console.log('Drum machine initialized');
        return drumMachine;
    } catch (error) {
        console.error('Error initializing drum machine:', error);
    }
});
