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
    <Box p={2}>
      <Label htmlFor="hide_caught">Hide Caught?</Label>
      <Switch id="hide_caught" checked={isChecked} onClick={handleClick} />
    </Box>
  );
}

export default React.memo(ToggleCaughtCheckbox);
