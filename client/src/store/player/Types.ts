export interface Note {
  note: string;
  octave: number;
}

export interface PlayerState {
  tonic: number;
  tonality: number;
  duration: number;
  playIndex: number;
  playing: boolean;
  notes: Note[];
  volume: number;
}

export const UPDATE_DURATION = 'UPDATE_DURATION';

interface UpdateDuration {
  type: typeof UPDATE_DURATION;
  duration: number;
}

export const SELECT_TONIC = 'SELECT_TONIC';

interface SelectTonic {
  type: typeof SELECT_TONIC;
  tonic: number;
}

export const SELECT_TONALITY = 'SELECT_TONALITY';

interface SelectTonality {
  type: typeof SELECT_TONALITY;
  tonality: number;
}

export const UPDATE_VOLUME = 'UPDATE_VOLUME';

interface UpdateVolume {
  type: typeof UPDATE_VOLUME;
  volume: number;
}

export const START = 'START';

interface Start {
  type: typeof START;
}

export const STOP = 'STOP';

interface Stop {
  type: typeof STOP;
}

export const PLAY_NOTE = 'PLAY_NOTE';

interface PlayNote {
  type: typeof PLAY_NOTE;
}

export type PlayerAction = UpdateDuration | SelectTonic | SelectTonality | UpdateVolume | Start | Stop | PlayNote;
