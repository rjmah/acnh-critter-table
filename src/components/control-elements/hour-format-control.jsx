import React, { useContext, useCallback } from 'react';
import classNames from 'classnames';
import { DispatchContext, StateContext } from 'Reducer';
import { CHANGE_TIME_FORMAT } from 'Reducer/actionTypes';
import { Label } from '@rebass/forms';
import { TIME_FORMAT_12, TIME_FORMAT_24 } from 'Utility/constants';

function HourFormatControl() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const toggleTimeFormat = useCallback(() => {
    dispatch({
      type: CHANGE_TIME_FORMAT,
      payload:
        state.timeFormat === TIME_FORMAT_12 ? TIME_FORMAT_24 : TIME_FORMAT_12,
    });
  }, [state.timeFormat, dispatch]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Label p={1} style={{ fontWeight: 600 }}>
        Time Format
      </Label>
      <div
        className={classNames('toggle_button_group', {
          'toggle_button_group--on': state.timeFormat === TIME_FORMAT_24,
        })}
        onClick={toggleTimeFormat}
      >
        <div>12 Hour</div>
        <div>24 Hour </div>
      </div>
    </div>
  );
}

export default React.memo(HourFormatControl);
