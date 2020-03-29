import React from 'react';
import {
  CHANGE_PREVIEW_MONTH,
  TOGGLE_FISH_CAUGHT,
  TOGGLE_HIDE_CAUGHT,
  CHANGE_MONTH_FILTER,
  CHANGE_TYPE_FILTER,
} from './actionTypes';
import { CURRENT_MONTH_INDEX } from '../components/constants';

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

const savedState = JSON.parse(localStorage.getItem('acnh_store')) || {};

export const initialState = {
  // previewMonthIndex: CURRENT_MONTH_INDEX,
  caughtFish: {},
  hideCaught: false,
  monthFilter: '',
  typeFilter: '',
  ...savedState,
  // TODO: Don't reset the preview month from persisted store, since it's pretty confusing when you land on the wrong month after coming back
  // Maybe can be solved be adding styles to denote you're previewing a month in the future
  previewMonthIndex: CURRENT_MONTH_INDEX,
};

export function reducer(previousState, { type, payload }) {
  let state;
  switch (type) {
    case CHANGE_PREVIEW_MONTH:
      state = { ...previousState, previewMonthIndex: payload };
      break;
    case TOGGLE_FISH_CAUGHT: {
      //TODO maybe use thunks. So logic isn't in the reducer
      const caughtFish = { ...previousState.caughtFish };
      if (previousState.caughtFish[payload]) {
        delete caughtFish[payload];
      } else {
        caughtFish[payload] = true;
      }
      //TODO maybe throttle this with thunks
      state = { ...previousState, caughtFish };
      break;
    }
    case TOGGLE_HIDE_CAUGHT: {
      state = { ...previousState, hideCaught: !previousState.hideCaught };
      break;
    }
    case CHANGE_MONTH_FILTER: {
      state = { ...previousState, monthFilter: payload };
      break;
    }
    case CHANGE_TYPE_FILTER: {
      state = { ...previousState, typeFilter: payload };
      break;
    }
    default:
      state = previousState;
  }

  if (state !== previousState) {
    localStorage.setItem('acnh_store', JSON.stringify(state));
  }
  return state;
}
