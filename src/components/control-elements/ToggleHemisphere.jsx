import React, { useContext, useCallback } from 'react';
import { DispatchContext, StateContext } from '../../reducer';
import { CHANGE_HEMISPHERE } from '../../reducer/actionTypes';
import { Box } from 'rebass';
import { Label, Select } from '@rebass/forms';
import {
  HEMISPHERE_FILTER_NORTHERN,
  HEMISPHERE_FILTER_SOUTHERN,
} from '../constants';

function ToggleHemisphere() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const handleChange = useCallback(
    (e) => {
      dispatch({ type: CHANGE_HEMISPHERE, payload: e.target.value });
    },
    [dispatch]
  );

  return (
    <Box
      p={1}
      width={[1, 1, 1 / 5]}
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Label
        p={1}
        htmlFor="hemisphere_filter"
        style={{ flexGrow: 1, hyphens: 'auto' }}
      >
        Hemisphere
      </Label>
      <Select
        id="hemisphere_filter"
        name="Hemisphere Filter"
        value={state.hemisphereFilter}
        onChange={handleChange}
      >
        <option key="all" value="">
          All
        </option>
        <option key="active" value={HEMISPHERE_FILTER_NORTHERN}>
          Northern
        </option>
        <option key="expiring" value={HEMISPHERE_FILTER_SOUTHERN}>
          Southern
        </option>
      </Select>
    </Box>
  );
}

export default React.memo(ToggleHemisphere);
