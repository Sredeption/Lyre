import {Instrument, State} from "./Instrument";
import {AudioSynth} from "./AudioSynth";

export class Acoustic extends Instrument {
    constructor(synth: AudioSynth) {
        super(synth, "acoustic");
    }

    attack(sampleRate: number, frequency: number, volume: number): number {
        return 0.002;
    }

    dampen(sampleRate: number, frequency: number, volume: number): number {
        return 1;
    }


    wave(state: State, sampleRate: number, frequency: number, volume: number): number {
        const valueTable = state.valueTable;
        const playVal = state.playVal;
        const periodCount = state.periodCount;

        const period = sampleRate / frequency;
        const p_hundredth = Math.floor((period - Math.floor(period)) * 100);

        let resetPlay = false;

        if (valueTable.length <= Math.ceil(period)) {

            valueTable.push(Math.round(Math.random()) * 2 - 1);

            return valueTable[valueTable.length - 1];

        } else {

            valueTable[playVal] = (valueTable[playVal >= (valueTable.length - 1) ? 0 : playVal + 1] + valueTable[playVal]) * 0.5;

            if (playVal >= Math.floor(period)) {
                if (playVal < Math.ceil(period)) {
                    if ((periodCount % 100) >= p_hundredth) {
                        // Reset
                        resetPlay = true;
                        valueTable[playVal + 1] = (valueTable[0] + valueTable[playVal + 1]) * 0.5;
                        state.periodCount++;
                    }
                } else {
                    resetPlay = true;
                }
            }

            const _return = valueTable[playVal];
            if (resetPlay) {
                state.playVal = 0;
            } else {
                state.playVal++;
            }

            return _return;

        }
    }
}