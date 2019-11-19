import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import {playerReducer} from "./player/Reducer";

const rootReducer = combineReducers({
  player: playerReducer
});

export type LyreState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  return createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );
}
