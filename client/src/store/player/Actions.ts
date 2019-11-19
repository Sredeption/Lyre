import {
  PLAY_NOTE,
  PlayerAction,
  SELECT_TONALITY,
  SELECT_TONIC,
  START,
  STOP,
  UPDATE_DURATION,
  UPDATE_VOLUME
} from "./Types";
import {ThunkAction} from "redux-thunk";
import {LyreState} from "../index";

export function updateDuration(duration: number): PlayerAction {

  return {
    type: UPDATE_DURATION,
    duration: duration
  }

}

export function selectTonic(tonic: number): PlayerAction {

  return {
    type: SELECT_TONIC,
    tonic: tonic
  }

}

export function selectTonality(tonality: number): PlayerAction {
  return {
    type: SELECT_TONALITY,
    tonality: tonality
  }

}

export function updateVolume(volume: number): PlayerAction {
  return {
    type: UPDATE_VOLUME,
    volume: volume
  }

}

function start(): PlayerAction {
  return {
    type: START
  }
}

export function stop(): PlayerAction {
  return {
    type: STOP
  }

}

function playNote(): PlayerAction {
  return {
    type: PLAY_NOTE
  }

}

export function play(): ThunkAction<void, LyreState, undefined, PlayerAction> {
  return (dispatch, getState) => {
    if (getState().player.playing) {
      throw new Error("The player is playing, couldn't be played again");
    }
    dispatch(start());
    dispatch(step())
  }

}

function step(): ThunkAction<void, LyreState, undefined, PlayerAction> {

  return (dispatch, getState) => {
    if (!getState().player.playing) {
      return;
    }

    dispatch(playNote());
    setTimeout(() => {
      dispatch(step());
    }, 1000);

  }

}
