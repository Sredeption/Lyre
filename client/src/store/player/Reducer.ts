import {
  Note,
  PLAY_NOTE,
  PlayerAction,
  PlayerState,
  SELECT_TONALITY,
  SELECT_TONIC,
  START,
  STOP,
  UPDATE_DURATION,
  UPDATE_VOLUME
} from './Types';
import {AudioSynth} from "../../audio/AudioSynth";


const synth = new AudioSynth();
const piano = synth.create("piano");
synth.volume = 0.5;

const initialState: PlayerState = {
  tonic: 0,
  tonality: 1,
  duration: 1,
  playIndex: 0,
  playing: false,
  notes: [],
  volume: synth.volume,
};

export function playerReducer(
  state = initialState,
  action: PlayerAction
): PlayerState {
  switch (action.type) {
    case UPDATE_DURATION:
      state.duration = action.duration;
      return {...state};
    case SELECT_TONIC:
      state.tonic = action.tonic;
      return {...state};
    case SELECT_TONALITY:
      state.tonality = action.tonality;
      return {...state};
    case UPDATE_VOLUME:
      synth.volume = action.volume;
      state.volume = synth.volume;
      return {...state};
    case START:
      state.playing = true;
      state.notes = getScale(state.tonic, state.tonality, 3);
      return {...state};
    case STOP:
      state.playing = false;
      state.playIndex = 0;
      return {...state};
    case PLAY_NOTE:
      if (state.playIndex < state.notes.length) {
        piano.play(state.notes[state.playIndex].note, state.notes[state.playIndex].octave, state.duration);
        state.playIndex += 1;
      } else {
        state.playing = false;
        state.playIndex = 0;
      }
      return {...state};
    default:
      return {...state};
  }

}

function getNote(pos: number): Note {
  return {note: AudioSynth.notes[pos % 12], octave: Math.floor(pos / 12) + 2}
}

function getScale(tonic: number, tonality: number, num: number): Note[] {

  const intervalsMap: { [key: string]: number[][] } = {
    "1": [[2, 2, 1, 2, 2, 2, 1], [1, 2, 2, 2, 1, 2, 2]], // major
    "2": [[2, 1, 2, 2, 1, 3, 1], [1, 3, 1, 2, 2, 1, 2]], // melodic minor
    "3": [[2, 1, 2, 2, 2, 2, 1], [1, 2, 2, 2, 2, 1, 2]]  // harmonic minor
  };

  const intervals = intervalsMap[tonality];
  let scale = [];
  let pos = tonic;
  for (let i = 0; i < num * 7; i++) {
    scale.push(pos);
    scale.push(pos);
    pos += intervals[0][i % 7]
  }
  for (let i = 0; i < num * 7 + 1; i++) {
    scale.push(pos);
    scale.push(pos);
    pos -= intervals[1][i % 7]
  }

  return scale.map(getNote)

}

