import React from 'react';
import classNames from 'classnames';

import { FULL_DAY_ARRAY } from 'Utility/constants';

function TimeCell({
  activeHours,
  activeHoursText,
  currentHour,
  currentMinute,
}) {
  return (
    <div>
      <div className="hour_container">
        {FULL_DAY_ARRAY.map((hour, i) => (
          <div
            key={i}
            className={classNames('hour_square', {
              'hour_square--active': activeHours.has(i),
            })}
          />
        ))}
        <div
          className="hour_container__current_time_marker"
          style={{
            left: 4 * currentHour + Math.floor(currentMinute / 15),
          }}
        />
      </div>
      <div className="hour_text">
        {activeHoursText.map((text, i) => (
          <div key={i} className="hour_text__entry">
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(TimeCell);
