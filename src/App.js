import React, { useReducer } from 'react';
import CritterTable from './components/CritterTable';
import PreviewMonthSelect from './components/PreviewMonthSelect';
import ToggleCaughtCheckbox from './components/ToggleCaughtCheckbox';
import './App.css';

import {
  reducer,
  initialState,
  DispatchContext,
  StateContext,
} from './reducer';
import ToggleActiveExpiringSelect from './components/ToggleActiveExpiringSelect';

/**
 * TODO
 * BEM
 * variable conventions
 * Add insects
 * Toggle between bugs and insects
 * Show both bugs and insects
 * 12/24hr Toggle
 * Hemisphere Toggle
 * Search
 * Sort
 * undo/redo caught checks
 * Mobile Responsive (Collapse columns, flex columns)
 * Mobile (control panel modal)
 * Mobile (preview modal)
 * Mobile (preview modal, swipe/ left right buttons to move through list)
 */

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div className="root_container">
          <div className="controls_container">
            <PreviewMonthSelect />
            <ToggleCaughtCheckbox />
            <ToggleActiveExpiringSelect />
          </div>
          <div className="table_container">
            <CritterTable />
          </div>
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
