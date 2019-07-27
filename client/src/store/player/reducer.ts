import {
  PlayerState,
  UPDATE_DURATION,
  PlayerActionTypes
} from "./types";

const initialState: PlayerState = {
  duration: 1
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
    default:
      return state;
  }

}
