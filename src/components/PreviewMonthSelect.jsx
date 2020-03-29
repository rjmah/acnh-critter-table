import React, { useContext, useCallback } from 'react';
import { MONTHS } from './utility';
import { DispatchContext } from '../reducer';
import { CHANGE_PREVIEW_MONTH } from '../reducer/actionTypes';

function PreviewMonthSelect() {
  const dispatch = useContext(DispatchContext);

  const handleChange = useCallback(
    (e) => {
      const optionValue = e.target.value;
      const payload = optionValue === '' ? null : parseInt(optionValue, 10);
      dispatch({ type: CHANGE_PREVIEW_MONTH, payload });
    },
    [dispatch]
  );
  return (
    <select onChange={handleChange}>
      <option key="ALL" value="">
        No Preview
      </option>
      {MONTHS.map((month, i) => (
        <option key={i} value={i}>
          {month}
        </option>
      ))}
    </select>
  );
}

export default React.memo(PreviewMonthSelect);
