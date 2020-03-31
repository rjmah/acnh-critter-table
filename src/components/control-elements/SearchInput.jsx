import React, { useContext, useCallback } from 'react';
import { DispatchContext, StateContext } from '../../reducer';
import { SEARCH } from '../../reducer/actionTypes';
import { Input } from '@rebass/forms';

function SearchInput() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const handleChange = useCallback(
    (e) => {
      dispatch({ type: SEARCH, payload: e.target.value });
    },
    [dispatch]
  );

  return (
    <div>
      <Input
        m={1 / 2}
        id="search"
        name="search"
        style={{ borderRadius: 5 }}
        value={state.searchValue}
        onChange={handleChange}
        placeholder="Search name or location"
      />
    </div>
  );
}

export default React.memo(SearchInput);
