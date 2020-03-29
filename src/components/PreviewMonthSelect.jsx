import React, { useContext, useCallback } from 'react';
import { MONTHS } from './utility';
import { DispatchContext } from '../reducer';
import { CHANGE_PREVIEW_MONTH } from '../reducer/actionTypes';
import { Box } from 'rebass';
import { Label, Select } from '@rebass/forms';

function PreviewMonthSelect() {
  const dispatch = useContext(DispatchContext);

  const handleChange = useCallback(
    (e) => {
      const optionValue = e.target.value;
      const payload = optionValue === '' ? null : parseInt(optionValue, 10);
      dispatch({ type: CHANGE_PREVIEW_MONTH, payload });
    },
    [dispatch]
  );
  return (
    <Box p={2}>
      <Label htmlFor="active_month">Active Month</Label>
      <Select
        id="active_month"
        name="Active Month"
        defaultValue=""
        onChange={handleChange}
      >
        <option key="ALL" value="">
          No Preview
        </option>
        {MONTHS.map((month, i) => (
          <option key={i} value={i}>
            {month}
          </option>
        ))}
        ))}
      </Select>
    </Box>
  );
}

export default React.memo(PreviewMonthSelect);
