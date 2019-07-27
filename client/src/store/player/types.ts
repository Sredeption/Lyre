export interface PlayerState {
  duration: number;
}

export const UPDATE_DURATION = "UPDATE_DURATION ";

interface UpdateDuration {
  type: typeof UPDATE_DURATION;
  duration: number;
}


export type PlayerActionTypes = UpdateDuration ;
