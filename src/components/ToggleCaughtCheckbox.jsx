import React, { useMemo, useContext, useCallback } from 'react';
import { DispatchContext, StateContext } from '../reducer';
import { Box } from 'rebass';
import { Label, Switch } from '@rebass/forms';
import { TOGGLE_HIDE_CAUGHT } from '../reducer/actionTypes';

function ToggleCaughtCheckbox() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const handleClick = useCallback(() => {
    dispatch({ type: TOGGLE_HIDE_CAUGHT });
  }, [dispatch]);

  const isChecked = useMemo(() => state.hideCaught, [state.hideCaught]);
  return (
    <Box p={1}>
      <Label htmlFor="hide_caught" className="toggle_caught_container">
        <div style={{ paddingTop: 4 }}>Hide Caught?</div>
        <div className="toggle_caught_switch">
          <Switch id="hide_caught" checked={isChecked} onClick={handleClick} />
        </div>
      </Label>
    </Box>
  );
}

export default React.memo(ToggleCaughtCheckbox);
