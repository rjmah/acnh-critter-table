import React from 'react';
import {
  CHANGE_PREVIEW_MONTH,
  TOGGLE_FISH_CAUGHT,
  TOGGLE_HIDE_CAUGHT,
  CHANGE_MONTH_FILTER,
} from './actionTypes';
import { CURRENT_MONTH_INDEX } from '../components/constants';

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

const initialCaughtFishState =
  JSON.parse(localStorage.getItem('acnh_caught_fish')) || {};

export const initialState = {
  previewMonthIndex: CURRENT_MONTH_INDEX,
  caughtFish: initialCaughtFishState,
  hideCaught: false,
  monthFilter: '',
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
    case CHANGE_MONTH_FILTER: {
      return { ...state, monthFilter: payload };
    }
    default:
      return state;
  }
}
