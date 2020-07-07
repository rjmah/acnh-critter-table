import React, { useContext, useCallback } from 'react';
import classNames from 'classnames';
import { DispatchContext, StateContext } from 'Reducer';
import { CHANGE_HEMISPHERE } from 'Reducer/actionTypes';
import { Label } from '@rebass/forms';
import {
  HEMISPHERE_FILTER_NORTHERN,
  HEMISPHERE_FILTER_SOUTHERN,
} from 'Utility/constants';

function HemisphereControl() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const toggleHemisphere = useCallback(() => {
    if (state.hemisphereFilter === HEMISPHERE_FILTER_NORTHERN) {
      dispatch({
        type: CHANGE_HEMISPHERE,
        payload: HEMISPHERE_FILTER_SOUTHERN,
      });
    } else {
      dispatch({
        type: CHANGE_HEMISPHERE,
        payload: HEMISPHERE_FILTER_NORTHERN,
      });
    }
  }, [state.hemisphereFilter, dispatch]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Label p={1} style={{ hyphens: 'auto', fontWeight: 600 }}>
        Hemisphere
      </Label>
      <div
        className={classNames('toggle_button_group', {
          'toggle_button_group--on':
            state.hemisphereFilter === HEMISPHERE_FILTER_SOUTHERN,
        })}
        onClick={toggleHemisphere}
      >
        <div>Northern</div>
        <div>Southern</div>
      </div>
    </div>
  );
}

export default React.memo(HemisphereControl);
