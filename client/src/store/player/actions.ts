import {PlayerActionTypes, UPDATE_DURATION} from "./types";

export function updateDuration(duration: number): PlayerActionTypes {

  return {
    type: UPDATE_DURATION,
    duration: duration
  }

}
