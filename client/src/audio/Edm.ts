import {Instrument, State} from "./Instrument";
import {AudioSynth} from "./AudioSynth";

export class Edm extends Instrument {
    constructor(synth: AudioSynth) {
        super(synth, "edm");
    }

    attack(sampleRate: number, frequency: number, volume: number): number {
        return 0.002;
    }

    dampen(sampleRate: number, frequency: number, volume: number): number {
        return 1;
    }

    wave(state: State, sampleRate: number, frequency: number, volume: number): number {
        const base = this.synth.modulations[0];
        const mod = this.synth.modulations.slice(1);
        return mod[0](
            state.i, sampleRate, frequency,
            mod[9](
                state.i, sampleRate, frequency,
                mod[2](
                    state.i, sampleRate, frequency,
                    Math.pow(base(state.i, sampleRate, frequency, 0), 3) +
                    Math.pow(base(state.i, sampleRate, frequency, 0.5), 5) +
                    Math.pow(base(state.i, sampleRate, frequency, 1), 7)
                )
            ) +
            mod[8](
                state.i, sampleRate, frequency,
                base(state.i, sampleRate, frequency, 1.75)
            )
        );
    }

}