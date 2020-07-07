import React, { useMemo, useContext, useCallback } from 'react';
import { DispatchContext, StateContext } from 'Reducer';
import { Label, Switch } from '@rebass/forms';
import { TOGGLE_HIDE_CAUGHT } from 'Reducer/actionTypes';
import { Flex } from 'rebass';

function HideCaughtControl() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const handleClick = useCallback(() => {
    dispatch({ type: TOGGLE_HIDE_CAUGHT });
  }, [dispatch]);

  const isChecked = useMemo(() => state.hideCaught, [state.hideCaught]);
  return (
    <Flex className="toggle_caught_container">
      <Label padding={1} htmlFor="hide_caught">
        Hide{' '}
        <span role="img" aria-label="checked" style={{ lineHeight: '18px' }}>
          🎣
        </span>
      </Label>
      <Flex justifyContent="center" flexDirection="column" flexGrow={1}>
        <Switch id="hide_caught" checked={isChecked} onClick={handleClick} />
      </Flex>
    </Flex>
  );
}

export default React.memo(HideCaughtControl);
