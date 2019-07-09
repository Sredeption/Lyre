import {AudioSynth} from "./AudioSynth";

function pack(c: number, arg: number) {
    return [new Uint8Array([arg, arg >> 8]),
        new Uint8Array([arg, arg >> 8, arg >> 16, arg >> 24])][c];
}

export abstract class Instrument {
    private readonly _name: string;
    private readonly _synth: AudioSynth;

    protected constructor(synth: AudioSynth, name: string) {
        this._synth = synth;
        this._name = name;

    }

    get name(): string {
        return this._name;
    }

    get synth(): AudioSynth {
        return this._synth;
    }

    public play(note: string, octave: number, duration: number) {
        let url: string | undefined = this.synth.load(this.name, octave, note, duration);
        if (url === undefined) {
            let blob = this.generate(note, octave, duration);
            url = URL.createObjectURL(blob);
            this.synth.save(this.name, octave, note, duration, url);
        }
        const audio = new Audio(url);
        audio.play();
    }

    generate(note: string, octave: number, duration: number): Blob {
        const frequency = this.synth.notes[note] * Math.pow(2, octave - 4);
        const sampleRate = this.synth.sampleRate;
        const volume = this.synth.volume;
        const channels = this.synth.channels;
        const bitsPerSample = this.synth.bitsPerSample;
        const attack = this.attack(sampleRate, frequency, volume);
        const dampen = this.dampen(sampleRate, frequency, volume);

        let val = 0;

        const data = new Uint8Array(new ArrayBuffer(Math.ceil(sampleRate * duration * 2)));
        const attackLen = sampleRate * attack;
        const decayLen = sampleRate * duration;

        let i = 0;
        let state = new State();

        for (; i < attackLen; i++) {
            state.i = i;
            val = volume * (i / (sampleRate * attack)) * this.wave(state, sampleRate, frequency, volume);
            data[i << 1] = val;
            data[(i << 1) + 1] = val >> 8;

        }

        for (; i < decayLen; i++) {
            state.i = i;
            val = volume * Math.pow((1 - ((i - (sampleRate * attack)) / (sampleRate * (duration - attack)))), dampen) *
                this.wave(state, sampleRate, frequency, volume);

            data[i << 1] = val;
            data[(i << 1) + 1] = val >> 8;

        }

        const out = [
            'RIFF',
            pack(1, 4 + (8 + 24/* chunk 1 length */) + (8 + 8/* chunk 2 length */)), // Length
            'WAVE',
            // chunk 1
            'fmt ', // Sub-chunk identifier
            pack(1, 16), // Chunk length
            pack(0, 1), // Audio format (1 is linear quantization)
            pack(0, channels),
            pack(1, sampleRate),
            pack(1, sampleRate * channels * bitsPerSample / 8), // Byte rate
            pack(0, channels * bitsPerSample / 8),
            pack(0, bitsPerSample),
            // chunk 2
            'data', // Sub-chunk identifier
            pack(1, data.length * channels * bitsPerSample / 8), // Chunk length
            data
        ];
        return new Blob(out, {type: 'audio/wav'});

    }

    abstract attack(sampleRate: number, frequency: number, volume: number): number;

    abstract dampen(sampleRate: number, frequency: number, volume: number): number;

    abstract wave(state: State, sampleRate: number, frequency: number, volume: number): number ;
}

export class State {
    public i: number = 0;
    public valueTable: number[] = [];
    public playVal: number = 0;
    public periodCount: number = 0;
}

