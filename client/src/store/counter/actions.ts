import { CounterState, INCREMENT_COUNT } from './types';

export function incrementCount() {
  return {
    type: INCREMENT_COUNT
  };
}
