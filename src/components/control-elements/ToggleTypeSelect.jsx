import React, { useContext, useCallback } from 'react';
import { DispatchContext, StateContext } from '../../reducer';
import { CHANGE_TYPE_FILTER } from '../../reducer/actionTypes';
import { Label, Select } from '@rebass/forms';
import { TYPE_FILTER_FISH, TYPE_FILTER_BUGS } from '../constants';

function ToggleTypeSelect() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const handleChange = useCallback(
    (e) => {
      dispatch({ type: CHANGE_TYPE_FILTER, payload: e.target.value });
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
      <Label p={1} htmlFor="type_filter">
        Type
      </Label>
      <Select
        id="type_filter"
        name="Type Filter"
        value={state.typeFilter}
        onChange={handleChange}
      >
        <option key="all" value="">
          All
        </option>
        <option key="active" value={TYPE_FILTER_FISH}>
          Fish
        </option>
        <option key="expiring" value={TYPE_FILTER_BUGS}>
          Bugs
        </option>
      </Select>
    </div>
  );
}

export default React.memo(ToggleTypeSelect);
