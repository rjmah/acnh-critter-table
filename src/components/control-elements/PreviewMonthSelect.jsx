import React, { useMemo, useContext, useCallback } from 'react';
import { MONTHS } from '../utility';
import { DispatchContext, StateContext } from '../../reducer';
import { CHANGE_PREVIEW_MONTH } from '../../reducer/actionTypes';
import { Box } from 'rebass';
import { Label, Select } from '@rebass/forms';

function PreviewMonthSelect() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const handleChange = useCallback(
    (e) => {
      const optionValue = e.target.value;
      const payload = optionValue === '' ? null : parseInt(optionValue, 10);
      dispatch({ type: CHANGE_PREVIEW_MONTH, payload });
    },
    [dispatch]
  );

  const value = useMemo(() => state.previewMonthIndex, [
    state.previewMonthIndex,
  ]);

  return (
    <Box p={1} width={[1, 1, 1 / 4]}>
      <Label p={1} htmlFor="active_month">
        Active Month
      </Label>
      <Select
        id="active_month"
        name="Active Month"
        value={value}
        onChange={handleChange}
      >
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