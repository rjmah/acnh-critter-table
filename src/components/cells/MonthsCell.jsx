import React from 'react';
import classNames from 'classnames';
import { MONTHS } from '../utility';

function MonthsCell({ activeMonths, previewMonthIndex }) {
  return (
    <div className="month_container">
      {MONTHS.map((month, i) => (
        <div
          key={i}
          className={classNames('month_square', {
            'month_square--active': activeMonths.has(i),
            'month_square--current': i === previewMonthIndex,
          })}
        >
          {month}
        </div>
      ))}
    </div>
  );
}

export default React.memo(MonthsCell);
