import React, { useContext, useCallback } from 'react';
import { DispatchContext, StateContext } from 'Reducer';
import { CHANGE_TIME_FORMAT } from 'Reducer/actionTypes';
import { Label, Select } from '@rebass/forms';
import { TIME_FORMAT_12, TIME_FORMAT_24 } from 'Utility/constants';

function HourFormatControl() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const handleChange = useCallback(
    (e) => {
      dispatch({ type: CHANGE_TIME_FORMAT, payload: e.target.value });
    },
    [dispatch]
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Label p={1} htmlFor="time_format_select">
        Time Format
      </Label>
      <Select
        id="time_format_select"
        name="Time Format"
        value={state.timeFormat}
        onChange={handleChange}
        sx={{
          borderRadius: 5,
        }}
      >
        <option key="12 hour" value={TIME_FORMAT_12}>
          AM / PM
        </option>
        <option key="24 hour" value={TIME_FORMAT_24}>
          24 hour
        </option>
      </Select>
    </div>
  );
}

export default React.memo(HourFormatControl);
