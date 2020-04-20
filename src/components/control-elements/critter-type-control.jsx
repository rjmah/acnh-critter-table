import React, { useContext, useCallback } from 'react';
import { DispatchContext, StateContext } from 'Reducer';
import { CHANGE_TYPE_FILTER } from 'Reducer/actionTypes';
import { Label, Select } from '@rebass/forms';
import {
  TYPE_FILTER_FISH,
  TYPE_FILTER_BUGS,
  TYPE_FILTER_FOSSILS,
} from 'Utility/constants';

function CritterTypeControl() {
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
        <option key="fish" value={TYPE_FILTER_FISH}>
          Fish
        </option>
        <option key="bugs" value={TYPE_FILTER_BUGS}>
          Bugs
        </option>
        <option key="fossils" value={TYPE_FILTER_FOSSILS}>
          Fossils
        </option>
      </Select>
    </div>
  );
}

export default React.memo(CritterTypeControl);
