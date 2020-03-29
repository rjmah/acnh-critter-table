import React, { useMemo, useContext, useCallback } from 'react';
import { DispatchContext, StateContext } from '../reducer';
import { TOGGLE_FISH_CAUGHT } from '../reducer/actionTypes';
import { Label, Checkbox } from '@rebass/forms';

function CaughtCell({ number }) {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const handleClick = useCallback(
    (e) => {
      dispatch({ type: TOGGLE_FISH_CAUGHT, payload: number });
    },
    [dispatch, number]
  );
  const isCaught = useMemo(() => {
    return state.caughtFish[number];
  }, [state.caughtFish, number]);
  return (
    <div>
      <Label>
        <Checkbox
          id={`fish_caught_${number}`}
          checked={isCaught || false}
          onClick={handleClick}
        />
      </Label>
    </div>
  );
}

export default React.memo(CaughtCell);
