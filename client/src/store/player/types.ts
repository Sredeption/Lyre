export interface PlayerState {
  duration: number;
  tonic: number;
  tonality: number;
}

export const UPDATE_DURATION = 'UPDATE_DURATION ';

interface UpdateDuration {
  type: typeof UPDATE_DURATION;
  duration: number;
}

export const SELECT_TONIC = 'SELECT_TONIC';

interface SelectTonic {
  type: typeof SELECT_TONIC;
  tonic: number;
}

export type PlayerActionTypes = UpdateDuration | SelectTonic;
