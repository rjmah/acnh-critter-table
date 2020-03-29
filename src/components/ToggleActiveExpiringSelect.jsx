import React, { useContext, useCallback } from 'react';
import { DispatchContext } from '../reducer';
import { CHANGE_MONTH_FILTER } from '../reducer/actionTypes';
import { Box } from 'rebass';
import { Label, Select } from '@rebass/forms';
import { MONTH_FILTER_ACTIVE, MONTH_FILTER_EXPIRING } from './constants';

function ToggleActiveExpiringSelect() {
  const dispatch = useContext(DispatchContext);

  const handleChange = useCallback(
    (e) => {
      dispatch({ type: CHANGE_MONTH_FILTER, payload: e.target.value });
    },
    [dispatch]
  );
  return (
    <Box p={2}>
      <Label htmlFor="month_filter">Show Months</Label>
      <Select
        id="month_filter"
        name="Month Filter"
        defaultValue=""
        onChange={handleChange}
      >
        <option key="all" value="">
          All
        </option>
        <option key="active" value={MONTH_FILTER_ACTIVE}>
          Only Active
        </option>
        <option key="expiring" value={MONTH_FILTER_EXPIRING}>
          Only Expiring
        </option>
      </Select>
    </Box>
  );
}

export default React.memo(ToggleActiveExpiringSelect);
