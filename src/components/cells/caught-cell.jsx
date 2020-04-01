import React, { useMemo, useContext, useCallback } from 'react';
import { DispatchContext, StateContext } from 'Reducer';
import { TOGGLE_CRITTER_CAUGHT } from 'Reducer/actionTypes';
import { Label, Checkbox } from '@rebass/forms';

function CaughtCell({ number, type }) {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const caughtKey = useMemo(() => `${type}${number}`, [type, number]);

  const handleChange = useCallback(
    (e) => {
      dispatch({ type: TOGGLE_CRITTER_CAUGHT, payload: caughtKey });
    },
    [dispatch, caughtKey]
  );
  const isCaught = useMemo(() => {
    return state.caughtCritter[caughtKey];
  }, [state.caughtCritter, caughtKey]);
  return (
    <div>
      <Label>
        <Checkbox
          id={`${type}_caught_${number}`}
          className="caught_checkbox"
          checked={isCaught || false}
          onChange={handleChange}
        />
      </Label>
    </div>
  );
}

export default React.memo(CaughtCell);
