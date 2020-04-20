import React, { useMemo, useContext, useCallback } from 'react';
import { DispatchContext, StateContext } from 'Reducer';
import { TOGGLE_CRITTER_IN_STORAGE } from 'Reducer/actionTypes';
import { Label, Checkbox } from '@rebass/forms';

function StorageCell({ number, type }) {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const storageKey = useMemo(() => `${type}${number}`, [type, number]);

  const handleChange = useCallback(
    (e) => {
      dispatch({ type: TOGGLE_CRITTER_IN_STORAGE, payload: storageKey });
    },
    [dispatch, storageKey]
  );
  const isStorage = useMemo(() => {
    return state.storageCritter[storageKey];
  }, [state.storageCritter, storageKey]);
  return (
    <div>
      <Label>
        <Checkbox
          id={`${type}_storage_${number}`}
          className="storage_checkbox"
          checked={isStorage || false}
          onChange={handleChange}
        />
      </Label>
    </div>
  );
}

export default React.memo(StorageCell);
