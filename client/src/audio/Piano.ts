import {Instrument, State} from "./Instrument";
import {AudioSynth} from "./AudioSynth";

export class Piano extends Instrument {
  constructor(synth: AudioSynth) {
    super(synth, "piano");
  }

  attack(sampleRate: number, frequency: number, volume: number): number {
    return 0.002;
  }

  dampen(sampleRate: number, frequency: number, volume: number): number {
    return Math.pow(0.5 * Math.log((frequency * volume) / sampleRate), 2);
  }

  wave(state: State, sampleRate: number, frequency: number, volume: number): number {
    const base = this.synth.modulations[0];
    return this.synth.modulations[1](
      state.i, sampleRate, frequency,
      Math.pow(base(state.i, sampleRate, frequency, 0), 2) +
      (0.75 * base(state.i, sampleRate, frequency, 0.25)) +
      (0.1 * base(state.i, sampleRate, frequency, 0.5))
    );
  }
}