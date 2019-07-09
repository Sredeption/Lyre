import AudioSynth from "."
import {Instrument} from "./Instrument";

it('create instruments', () => {
    let synth: AudioSynth = new AudioSynth();
    synth.create("piano");
    synth.create("acoustic");
    synth.create("edm");
    synth.create("organ");
    expect(() => {
        synth.create("edmm");
    }).toThrow(new Error(`undefined instrument "edmm"`));
});

it('play piano', () => {
    let synth: AudioSynth = new AudioSynth();
    let piano: Instrument = synth.create("piano");
    piano.generate('C', 4, 2)

});
