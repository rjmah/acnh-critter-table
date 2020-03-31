import React, { useMemo, useContext, useCallback } from 'react';
import { DispatchContext, StateContext } from '../../reducer';
import { Label, Switch } from '@rebass/forms';
import { TOGGLE_HIDE_CAUGHT } from '../../reducer/actionTypes';
import { Box, Flex } from 'rebass';

function ToggleCaughtCheckbox() {
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
        <span role="img" aria-label="checked">
          ☑️
        </span>
      </Label>
      <Box flexGrow={1}>
        <Flex justifyContent="center" flexDirection="column" height="100%">
          <Switch id="hide_caught" checked={isChecked} onClick={handleClick} />
        </Flex>
      </Box>
    </Flex>
  );
}

export default React.memo(ToggleCaughtCheckbox);
