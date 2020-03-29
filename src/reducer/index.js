import React from 'react';
import { CHANGE_PREVIEW_MONTH } from './actionTypes';

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

export const initialState = { previewMonthIndex: null };

export function reducer(state, { type, payload }) {
  console.log(payload);
  switch (type) {
    case CHANGE_PREVIEW_MONTH:
      return { ...state, previewMonthIndex: payload };
    default:
      return state;
  }
}
