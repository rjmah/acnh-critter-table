import React, { useContext, useCallback } from 'react';
import classNames from 'classnames';
import { DispatchContext, StateContext } from 'Reducer';
import { CHANGE_MONTH_FILTER } from 'Reducer/actionTypes';
import { Label, Select } from '@rebass/forms';
import { MONTH_FILTER_ACTIVE, MONTH_FILTER_EXPIRING } from 'Utility/constants';

function AvailibilityControl() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const handleChange = useCallback(
    (e) => {
      dispatch({ type: CHANGE_MONTH_FILTER, payload: e.target.value });
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
      <Label p={1} htmlFor="month_filter">
        Availability
      </Label>
      <Select
        className={classNames({
          select_is_active: state.monthFilter === MONTH_FILTER_ACTIVE,
          select_is_expiring: state.monthFilter === MONTH_FILTER_EXPIRING,
        })}
        id="month_filter"
        name="Month Filter"
        value={state.monthFilter}
        onChange={handleChange}
        sx={{
          borderRadius: 5,
        }}
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
    </div>
  );
}

export default React.memo(AvailibilityControl);
