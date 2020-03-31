import React, { useCallback, useContext, useMemo } from 'react';
import { DispatchContext, StateContext } from '../../reducer';
import { SORT_COLUMN } from '../../reducer/actionTypes';

function HeaderCell({ className, style, label, sortKey }) {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const handleClick = useCallback(() => {
    dispatch({ type: SORT_COLUMN, payload: sortKey });
  }, [dispatch, sortKey]);
  let headerStyle = { ...style };
  if (sortKey) {
    headerStyle.cursor = 'pointer';
  }

  const sortIcon = useMemo(() => {
    if (state.sortColumn !== sortKey) return '';
    if (state.sortDirection === 1) return '↑';
    if (state.sortDirection === 2) return '↓';
  }, [sortKey, state.sortColumn, state.sortDirection]);
  return (
    <div
      className={className}
      style={headerStyle}
      onClick={sortKey ? handleClick : undefined}
    >
      {label} {sortIcon}
    </div>
  );
}

export default React.memo(HeaderCell);
