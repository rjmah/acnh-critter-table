import React, { useContext } from 'react';
import classNames from 'classnames';

import {
  FULL_DAY_ARRAY,
  TIME_FORMAT_12,
  TIME_FORMAT_24,
} from 'Utility/constants';
import { StateContext } from 'Reducer';

function TimeCell({
  activeHours,
  activeHoursText,
  currentHour,
  currentMinute,
}) {
  const state = useContext(StateContext);

  return (
    <div>
      <div
        className={classNames('hour_labels', {
          'hour_labels--12': state.timeFormat === TIME_FORMAT_12,
          'hour_labels--24': state.timeFormat === TIME_FORMAT_24,
        })}
      >
        {state.timeFormat === TIME_FORMAT_12 ? (
          <React.Fragment>
            <div className="hour_label">
              AM
              <br />
              12
            </div>
            <div className="hour_label">6</div>
            <div className="hour_label">
              PM
              <br />
              12
            </div>
            <div className="hour_label">6</div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="hour_label">0</div>
            <div className="hour_label">6</div>
            <div className="hour_label">12</div>
            <div className="hour_label">18</div>
          </React.Fragment>
        )}
      </div>
      <div className="hour_container">
        {FULL_DAY_ARRAY.map((hour, i) => (
          <div key={i} className="hour_square">
            {activeHours.has(i) && (
              <div
                className={classNames('hour_square__active', {
                  'hour_square__active--start': !activeHours.has((i + 23) % 24),
                  'hour_square__active--end': !activeHours.has((i + 1) % 24),
                })}
              />
            )}
          </div>
        ))}
        <div
          className="hour_container__current_time_marker"
          style={{
            left: 4 * currentHour + Math.floor(currentMinute / 15),
          }}
        />
        <div className="hour_container__end_marker" />
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
