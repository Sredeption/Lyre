import LRU from "lru-cache"
import {Instrument} from "./Instrument";
import {Edm} from "./Edm";
import {Acoustic} from "./Acoustic";
import {Organ} from "./Organ";
import {Piano} from "./Piano";

export class AudioSynth {
    private cache: LRU<string, string>;
    private instruments: Map<string, Instrument>;

    constructor() {
        const cacheOptions: any = {};
        cacheOptions.max = 100;
        cacheOptions.maxAge = 60 * 1000;
        this.cache = new LRU(cacheOptions);

        this.instruments = new Map<string, Instrument>();
        const acoustic = new Acoustic(this);
        this.instruments.set(acoustic.name, acoustic);
        const edm = new Edm(this);
        this.instruments.set(edm.name, edm);
        const organ = new Organ(this);
        this.instruments.set(organ.name, organ);
        const piano = new Piano(this);
        this.instruments.set(piano.name, piano);
    }

    save(name: string, octave: number, note: string, duration: number, dataURI: string) {
        this.cache.set(`${name}-${octave - 1}-${note}-${duration}`, dataURI)
    }

    load(name: string, octave: number, note: string, duration: number): string | undefined {
        return this.cache.get(`${name}-${octave - 1}-${note}-${duration}`)
    }

    get sampleRate(): number {
        return this._sampleRate;
    }

    set sampleRate(value: number) {
        this._sampleRate = Math.max(Math.min(value, 44100), 4000);
    }

    get bitsPerSample(): number {
        return this._bitsPerSample;
    }

    get channels(): number {
        return this._channels;
    }

    get volume(): number {
        return Math.round(this._volume / 32768 * 10000) / 10000;
    }

    set volume(value: number) {
        value = Math.round(value * 32768);
        this._volume = Math.max(Math.min(value, 32768), 0);
    }

    private _sampleRate: number = 44100;

    private _bitsPerSample: number = 16;

    private _channels: number = 1;

    private _volume: number = 32768;


    private readonly _notes: { [key: string]: number } = {
        'C': 261.63,
        'C#': 277.18,
        'D': 293.66,
        'D#': 311.13,
        'E': 329.63,
        'F': 349.23,
        'F#': 369.99,
        'G': 392.00,
        'G#': 415.30,
        'A': 440.00,
        'A#': 466.16,
        'B': 493.88
    };

    get notes() {
        return this._notes;
    }

    private readonly _modulations = [
        function (i: number, sampleRate: number, frequency: number, x: number) {
            return Math.sin(2 * Math.PI * ((i / sampleRate) * frequency) + x);
        },
        function (i: number, sampleRate: number, frequency: number, x: number) {
            return Math.sin(4 * Math.PI * ((i / sampleRate) * frequency) + x);
        },
        function (i: number, sampleRate: number, frequency: number, x: number) {
            return Math.sin(8 * Math.PI * ((i / sampleRate) * frequency) + x);
        },
        function (i: number, sampleRate: number, frequency: number, x: number) {
            return Math.sin(0.5 * Math.PI * ((i / sampleRate) * frequency) + x);
        },
        function (i: number, sampleRate: number, frequency: number, x: number) {
            return Math.sin(0.25 * Math.PI * ((i / sampleRate) * frequency) + x);
        },
        function (i: number, sampleRate: number, frequency: number, x: number) {
            return 0.5 * Math.sin(2 * Math.PI * ((i / sampleRate) * frequency) + x);
        },
        function (i: number, sampleRate: number, frequency: number, x: number) {
            return 0.5 * Math.sin(4 * Math.PI * ((i / sampleRate) * frequency) + x);
        },
        function (i: number, sampleRate: number, frequency: number, x: number) {
            return 0.5 * Math.sin(8 * Math.PI * ((i / sampleRate) * frequency) + x);
        },
        function (i: number, sampleRate: number, frequency: number, x: number) {
            return 0.5 * Math.sin(0.5 * Math.PI * ((i / sampleRate) * frequency) + x);
        },
        function (i: number, sampleRate: number, frequency: number, x: number) {
            return 0.5 * Math.sin(0.25 * Math.PI * ((i / sampleRate) * frequency) + x);
        }
    ];

    get modulations() {
        return this._modulations;
    }

    create(name: string): Instrument {
        let instrument: Instrument | undefined = this.instruments.get(name);
        if (instrument === undefined) {
            throw new Error(`undefined instrument "${name}"`);
        } else {
            return instrument;
        }
    }
}