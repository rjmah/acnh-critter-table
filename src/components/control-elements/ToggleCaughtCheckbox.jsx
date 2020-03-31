import React, { useMemo, useContext, useCallback } from 'react';
import { DispatchContext, StateContext } from '../../reducer';
import { Label, Switch } from '@rebass/forms';
import { TOGGLE_HIDE_CAUGHT } from '../../reducer/actionTypes';

function ToggleCaughtCheckbox() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const handleClick = useCallback(() => {
    dispatch({ type: TOGGLE_HIDE_CAUGHT });
  }, [dispatch]);

  const isChecked = useMemo(() => state.hideCaught, [state.hideCaught]);
  return (
    <div className="toggle_caught_container">
      <Label padding={1} htmlFor="hide_caught">
        Hide{' '}
        <span role="img" aria-label="checked">
          ☑️
        </span>
      </Label>
      <Switch id="hide_caught" checked={isChecked} onClick={handleClick} />
    </div>
  );
}

export default React.memo(ToggleCaughtCheckbox);
