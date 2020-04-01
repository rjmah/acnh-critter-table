import React, { useMemo, useContext, useCallback } from 'react';
import { DispatchContext, StateContext } from 'Reducer';
import { CHANGE_PREVIEW_MONTH } from 'Reducer/actionTypes';
import { Label, Select } from '@rebass/forms';
import { BOOT_CURRENT_MONTH_INDEX, MONTHS } from 'Utility/constants';

function ActiveMonthControl() {
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
    <div>
      <Label p={1} htmlFor="active_month">
        Month
      </Label>
      <Select
        fontWeight={
          state.previewMonthIndex === BOOT_CURRENT_MONTH_INDEX ? 800 : undefined
        }
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
    </div>
  );
}

export default React.memo(ActiveMonthControl);
