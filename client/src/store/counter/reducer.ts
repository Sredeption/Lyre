import {
  CounterState,
  INCREMENT_COUNT,
  CounterActionTypes
} from "./types";


const initialState: CounterState = {
  count: 0
};

export function counterReducer(
  state = initialState,
  action: CounterActionTypes
): CounterState {
  switch (action.type) {
    case INCREMENT_COUNT: {
      return {
        count: state.count + 1
      };
    }
    default:
      return state;
  }
}
