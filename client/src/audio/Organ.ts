import {Instrument, State} from "./Instrument";
import {AudioSynth} from "./AudioSynth";

export class Organ extends Instrument {
    constructor(synth: AudioSynth) {
        super(synth, "organ");
    }

    attack(sampleRate: number, frequency: number, volume: number): number {
        return 0.3;
    }

    dampen(sampleRate: number, frequency: number, volume: number): number {
        return 1 + (frequency * 0.01);
    }

    wave(state: State, sampleRate: number, frequency: number, volume: number): number {
        const base = this.synth.modulations[0];
        return this.synth.modulations[1](
            state.i,
            sampleRate,
            frequency,
            base(state.i, sampleRate, frequency, 0) +
            0.5 * base(state.i, sampleRate, frequency, 0.25) +
            0.25 * base(state.i, sampleRate, frequency, 0.5)
        );
    }
}