import React, { useReducer } from 'react';
import Controls from './components/Controls';
import CritterTable from './components/CritterTable';
import './App.css';

import {
  reducer,
  initialState,
  DispatchContext,
  StateContext,
} from './reducer';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div className="root_container">
          <div className="controls_container">
            <Controls />
          </div>
          <CritterTable />
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
