import React from 'react';
import LZString from 'lz-string';

import {
  CHANGE_PREVIEW_MONTH,
  TOGGLE_CRITTER_CAUGHT,
  TOGGLE_CRITTER_IN_STORAGE,
  TOGGLE_HIDE_CAUGHT,
  CHANGE_MONTH_FILTER,
  CHANGE_TYPE_FILTER,
  CHANGE_HEMISPHERE,
  SEARCH,
  CHANGE_TIME_FORMAT,
  IMPORT_STATE,
  FILTER_RESET,
  SORT_COLUMN,
} from './actionTypes';
import {
  BOOT_CURRENT_MONTH_INDEX,
  HEMISPHERE_FILTER_NORTHERN,
  TIME_FORMAT_12,
} from 'Utility/constants';

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

const lzSavedState = localStorage.getItem('acnh_store_lz');

const savedStateString = lzSavedState
  ? LZString.decompressFromBase64(lzSavedState)
  : localStorage.getItem('acnh_store');
const savedState = JSON.parse(savedStateString) || {};

const initialFilterState = {
  hideCaught: false,
  monthFilter: '',
  typeFilter: '',
  searchValue: '',
  sortColumn: '',
  sortDirection: 0,
};
export const initialState = {
  // previewMonthIndex: BOOT_CURRENT_MONTH_INDEX,
  caughtCritter: {},
  storageCritter: {},
  ...initialFilterState,
  timeFormat: TIME_FORMAT_12,
  hemisphereFilter: HEMISPHERE_FILTER_NORTHERN,
  storageValue: localStorage.getItem('acnh_store_lz'),
  ...savedState,
  // TODO: Don't reset the preview month from persisted store, since it's pretty confusing when you land on the wrong month after coming back
  // Maybe can be solved be adding styles to denote you're previewing a month in the future
  previewMonthIndex: BOOT_CURRENT_MONTH_INDEX,
};

export function reducer(previousState, { type, payload }) {
  let state;
  switch (type) {
    case FILTER_RESET: {
      state = {
        ...previousState,
        previewMonthIndex: BOOT_CURRENT_MONTH_INDEX,
        ...initialFilterState,
      };
      break;
    }
    case IMPORT_STATE:
      state = JSON.parse(LZString.decompressFromBase64(payload));
      break;
    case CHANGE_PREVIEW_MONTH: {
      state = { ...previousState, previewMonthIndex: payload };
      break;
    }
    case TOGGLE_CRITTER_CAUGHT: {
      //TODO maybe use thunks. So logic isn't in the reducer
      const caughtCritter = { ...previousState.caughtCritter };
      if (previousState.caughtCritter[payload]) {
        delete caughtCritter[payload];
      } else {
        caughtCritter[payload] = true;
      }
      //TODO maybe throttle this with thunks
      state = { ...previousState, caughtCritter };
      break;
    }
    case TOGGLE_CRITTER_IN_STORAGE: {
      //TODO maybe use thunks. So logic isn't in the reducer
      const storageCritter = { ...previousState.storageCritter };
      if (previousState.storageCritter[payload]) {
        delete storageCritter[payload];
      } else {
        storageCritter[payload] = true;
      }
      //TODO maybe throttle this with thunks
      state = { ...previousState, storageCritter };
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
    case CHANGE_HEMISPHERE: {
      state = { ...previousState, hemisphereFilter: payload };
      break;
    }
    case SEARCH: {
      state = { ...previousState, searchValue: payload };
      break;
    }
    case CHANGE_TIME_FORMAT: {
      state = { ...previousState, timeFormat: payload };
      break;
    }
    case SORT_COLUMN: {
      const {
        sortColumn: previousSortColumn,
        sortDirection: previousSortDirection,
      } = previousState;

      /**
       * 0 === unfiltered
       * 1 === asc
       * 2 === desc
       */
      const sortDirection =
        previousSortColumn === payload ? (previousSortDirection + 1) % 3 : 1;

      state = { ...previousState, sortColumn: payload, sortDirection };
      break;
    }
    default:
      state = previousState;
  }

  if (state !== previousState) {
    const { storageValue, ...appState } = state;
    const newStorageValue = LZString.compressToBase64(JSON.stringify(appState));
    // Save storage value on state to share with export component
    state.storageValue = newStorageValue;
    localStorage.setItem('acnh_store_lz', newStorageValue);
  }
  return state;
}
