import {PlayerActionTypes, SELECT_TONALITY, SELECT_TONIC, UPDATE_DURATION} from "./types";

export function updateDuration(duration: number): PlayerActionTypes {

  return {
    type: UPDATE_DURATION,
    duration: duration
  }

}

export function selectTonic(tonic: number): PlayerActionTypes {

  return {
    type: SELECT_TONIC,
    tonic: tonic
  }

}

export function selectTonality(tonality: number): PlayerActionTypes {
  return {
    type: SELECT_TONALITY,
    tonality: tonality
  }

}
