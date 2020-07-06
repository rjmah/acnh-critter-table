import React, { useContext, useCallback } from 'react';
import { DispatchContext, StateContext } from 'Reducer';
import { CHANGE_HEMISPHERE } from 'Reducer/actionTypes';
import { Label, Select } from '@rebass/forms';
import {
  HEMISPHERE_FILTER_NORTHERN,
  HEMISPHERE_FILTER_SOUTHERN,
} from 'Utility/constants';

function HemisphereControl() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const handleChange = useCallback(
    (e) => {
      dispatch({ type: CHANGE_HEMISPHERE, payload: e.target.value });
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
      <Label p={1} htmlFor="hemisphere_filter" style={{ hyphens: 'auto' }}>
        Hemisphere
      </Label>
      <Select
        id="hemisphere_filter"
        name="Hemisphere Filter"
        value={state.hemisphereFilter}
        onChange={handleChange}
        sx={{
          borderRadius: 5,
        }}
      >
        <option key="active" value={HEMISPHERE_FILTER_NORTHERN}>
          Northern
        </option>
        <option key="expiring" value={HEMISPHERE_FILTER_SOUTHERN}>
          Southern
        </option>
      </Select>
    </div>
  );
}

export default React.memo(HemisphereControl);
