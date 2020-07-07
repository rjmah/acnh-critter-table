import React, { useMemo, useState, useContext, useCallback } from 'react';
import { StateContext } from 'Reducer';
import { Label } from '@rebass/forms';
import { MONTHS, TIME_FORMAT_12 } from 'Utility/constants';
import useInterval from 'useInterval';

function MonthTimeDisplay({ setIsModalOpen }) {
  const state = useContext(StateContext);
  const is12HrFormat = useMemo(() => state.timeFormat === TIME_FORMAT_12, [
    state.timeFormat,
  ]);

  const calcDisplayedTime = useCallback(
    (am = true) => {
      console.log('state.minuteOffset', state.minuteOffset);
      let d = new Date();
      d = new Date(d.getTime() + (state.minuteOffset || 0) * 60 * 1000);

      let currentHours = d.getHours();
      let currentMinutes = d.getMinutes();

      let currentIsAm = true;
      if (is12HrFormat) {
        if (currentHours > 11) {
          currentIsAm = false;
        }
        if (currentHours === 0) {
          currentHours = 12;
        } else if (currentHours > 12) {
          currentHours = currentHours % 12;
        }
      }

      const time = `${currentHours}:${currentMinutes
        .toString()
        .padStart(2, '0')}`;

      return is12HrFormat ? `${time} ${currentIsAm ? 'AM' : 'PM'}` : time;
    },
    [is12HrFormat, state.minuteOffset]
  );

  const [displayedTime, setDisplayedTime] = useState(calcDisplayedTime());

  const updateDisplayedTime = useCallback(() => {
    setDisplayedTime(calcDisplayedTime());
  }, [calcDisplayedTime]);

  useInterval(updateDisplayedTime, 1000);

  const navigateToModal = useCallback(
    (e) => {
      e.preventDefault();
      setIsModalOpen(true);
    },
    [setIsModalOpen]
  );
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Label p={1} style={{ hyphens: 'auto' }}>
        Time
      </Label>
      <a
        href="#"
        onClick={navigateToModal}
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {MONTHS[state.previewMonthIndex]}
        <br /> {displayedTime}
      </a>
    </div>
  );
}

export default React.memo(MonthTimeDisplay);
