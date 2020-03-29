import React from 'react';
import {
  CHANGE_PREVIEW_MONTH,
  TOGGLE_FISH_CAUGHT,
  TOGGLE_HIDE_CAUGHT,
} from './actionTypes';

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

const initialCaughtFishState =
  JSON.parse(localStorage.getItem('acnh_caught_fish')) || {};

export const initialState = {
  previewMonthIndex: null,
  caughtFish: initialCaughtFishState,
  hideCaught: false,
};

export function reducer(state, { type, payload }) {
  switch (type) {
    case CHANGE_PREVIEW_MONTH:
      return { ...state, previewMonthIndex: payload };
    case TOGGLE_FISH_CAUGHT: {
      //TODO maybe use thunks. So logic isn't in the reducer
      const caughtFish = { ...state.caughtFish };
      if (state.caughtFish[payload]) {
        delete caughtFish[payload];
      } else {
        caughtFish[payload] = true;
      }
      //TODO maybe throttle this with thunks
      localStorage.setItem('acnh_caught_fish', JSON.stringify(caughtFish));
      return { ...state, caughtFish };
    }
    case TOGGLE_HIDE_CAUGHT: {
      return { ...state, hideCaught: !state.hideCaught };
    }
    default:
      return state;
  }
}
