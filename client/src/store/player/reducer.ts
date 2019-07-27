import {PlayerActionTypes, PlayerState, SELECT_TONIC, UPDATE_DURATION} from "./types";

const initialState: PlayerState = {
  duration: 1,
  tonic: 0,
  tonality: 0,
};

export function playerReducer(
  state = initialState,
  action: PlayerActionTypes
): PlayerState {
  switch (action.type) {
    case UPDATE_DURATION:
      return {
        ...state,
        duration: action.duration
      };
    case SELECT_TONIC:
      return {
        ...state,
        tonic: action.tonic
      };
    default:
      return state;
  }

}
