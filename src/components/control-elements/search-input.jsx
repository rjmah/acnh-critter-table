import React, { useContext, useCallback, useMemo } from 'react';
import { DispatchContext, StateContext } from 'Reducer';
import { SEARCH } from 'Reducer/actionTypes';
import { Button } from 'rebass';
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

  const handleClick = useCallback(
    (e) => {
      dispatch({ type: SEARCH, payload: '' });
    },
    [dispatch]
  );
  const isClearButtonShown = useMemo(() => !!state.searchValue, [
    state.searchValue,
  ]);

  return (
    <div className="search">
      <Input
        m={1 / 2}
        id="search"
        name="search"
        style={{ borderRadius: 5, marginRight: 1 }}
        value={state.searchValue}
        onChange={handleChange}
        placeholder="Search name or location"
      />
      {isClearButtonShown && (
        <Button className="search__clear_button" p={0} onClick={handleClick}>
          <span role="img" aria-label="clear search">
            ✖️
          </span>
        </Button>
      )}
    </div>
  );
}

export default React.memo(SearchInput);
