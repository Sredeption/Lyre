export interface CounterState {
  count: number;
}

export const INCREMENT_COUNT = "INCREMENT_COUNT";

interface IncrementCountAction {
  type: typeof INCREMENT_COUNT;
}

export type CounterActionTypes = IncrementCountAction;
