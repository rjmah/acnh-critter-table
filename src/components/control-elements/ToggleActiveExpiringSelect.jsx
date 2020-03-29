import React, { useContext, useCallback } from 'react';
import { DispatchContext, StateContext } from '../../reducer';
import { CHANGE_MONTH_FILTER } from '../../reducer/actionTypes';
import { Box } from 'rebass';
import { Label, Select } from '@rebass/forms';
import { MONTH_FILTER_ACTIVE, MONTH_FILTER_EXPIRING } from '../constants';

function ToggleActiveExpiringSelect() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const handleChange = useCallback(
    (e) => {
      dispatch({ type: CHANGE_MONTH_FILTER, payload: e.target.value });
    },
    [dispatch]
  );

  return (
    <Box
      p={1}
      width={[1, 1, 1 / 4]}
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Label p={1} htmlFor="month_filter" style={{ flexGrow: 1 }}>
        Month
      </Label>
      <Select
        id="month_filter"
        name="Month Filter"
        value={state.monthFilter}
        onChange={handleChange}
      >
        <option key="all" value="">
          All
        </option>
        <option key="active" value={MONTH_FILTER_ACTIVE}>
          Active
        </option>
        <option key="expiring" value={MONTH_FILTER_EXPIRING}>
          Expiring
        </option>
      </Select>
    </Box>
  );
}

export default React.memo(ToggleActiveExpiringSelect);