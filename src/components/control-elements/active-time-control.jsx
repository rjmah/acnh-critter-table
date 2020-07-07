import React, {
  useMemo,
  useEffect,
  useContext,
  useCallback,
  useState,
} from 'react';
import classNames from 'classnames';
import { DispatchContext, StateContext } from 'Reducer';
import { Label, Input } from '@rebass/forms';
import { TIME_FORMAT_12 } from 'Utility/constants';
import { Box, Flex } from 'rebass';
import { CHANGE_OFFSET } from 'Reducer/actionTypes';
import useInterval from 'useInterval';

function ActiveTimeControl() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const [isValidDate, setIsValidDate] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const is12HrFormat = useMemo(() => state.timeFormat === TIME_FORMAT_12, [
    state.timeFormat,
  ]);

  // Helper function to calculate current displayed time
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

      return [
        `${currentHours}:${currentMinutes.toString().padStart(2, '0')}`,
        currentIsAm,
      ];
    },
    [is12HrFormat, state.minuteOffset]
  );

  // Calculate and set initial values for `setState`
  const [digits, ampm] = calcDisplayedTime();

  const [timeText, setTimeText] = useState(digits);
  const [lastValidTime, setLastValidTime] = useState(digits);
  const [isAm, setIsAm] = useState(ampm);

  const updateCurrentTime = useCallback(() => {
    if (isFocused) return;

    const [digits, ampm] = calcDisplayedTime();
    setTimeText(digits);
    setIsAm(ampm);
  }, [isFocused, calcDisplayedTime]);

  useInterval(updateCurrentTime, 1000);

  const calculateOffset = useCallback(() => {
    if (!isValidDate) return;
    setLastValidTime(timeText);

    const d1 = new Date();

    let [hours, minutes] = timeText.split(':');
    if (is12HrFormat) {
      if (hours === '12') {
        hours = 0;
      }
      if (!isAm) {
        hours = (parseInt(hours, 10) + 12) % 24;
      }
    }

    const d2 = new Date(
      d1.getFullYear(),
      d1.getMonth(),
      d1.getDate(),
      hours,
      minutes,
      d1.getSeconds(),
      d1.getMilliseconds()
    );

    const offset = (d2 - d1) / (60 * 1000);
    dispatch({ type: CHANGE_OFFSET, payload: offset });
  }, [timeText, is12HrFormat, isAm, isValidDate, dispatch]);

  // Text input change handler
  const handleChange = useCallback(
    (e) => {
      let val = e.target.value;
      if (!typeof val === 'string') return setTimeText(val);

      // Only allow numbers and colon
      if (val.match(/[^0-9:]/)) return;

      // Don't allow more than one colon
      if (val.match(/[:]{2,}/)) return;

      const digitLen = val.replace(':', '').length;
      // Only allow up to 4 digits
      if (digitLen > 4) return;

      if (!val.includes(':') && digitLen === 3) {
        val = `${val[0]}:${val.slice(1, 3)}`;
      } else if (digitLen === 4) {
        val = val.replace(':', '');
        val = `${val.slice(0, 2)}:${val.slice(2, 4)}`;
      }
      setTimeText(val);

      const regex24hr = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      const regex12hr = /^(([0]?[1-9]|1[0-2])(:)([0-5][0-9]))$/;
      const validTime = !!val.match(is12HrFormat ? regex12hr : regex24hr);

      setIsValidDate(validTime);

      if (!validTime) return;
      calculateOffset();
    },
    [calculateOffset, is12HrFormat]
  );

  // useEffect(() => {
  //   updateCurrentTime();
  // }, [state.timeFormat, updateCurrentTime]);

  useEffect(() => {
    calculateOffset();
  }, [calculateOffset, timeText, isAm]);

  const toggleAmPm = useCallback(() => {
    setIsAm(!isAm);
    calculateOffset();
  }, [isAm, calculateOffset]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, [setIsFocused]);

  const handleBlur = useCallback(() => {
    calculateOffset();
    setIsFocused(false);
    setTimeText(lastValidTime);
    setIsValidDate(true);
  }, [calculateOffset, setIsFocused, setTimeText, lastValidTime]);

  return (
    <div>
      <Label p={1} style={{ fontWeight: 600 }} htmlFor="active_time">
        Active Time
      </Label>
      <Flex>
        <Box width={1}>
          <Input
            id="active_time"
            name="Active Time"
            value={timeText}
            onChange={handleChange}
            sx={{
              borderRadius: 5,
              backgroundColor: isValidDate ? 'initial' : '#f4cccc',
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Box>

        {is12HrFormat && (
          <Box width={1 / 2}>
            <Flex
              marginLeft={2}
              className={classNames('toggle_button_group', {
                'toggle_button_group--on': !isAm,
              })}
              onClick={toggleAmPm}
            >
              <div>AM</div>
              <div>PM</div>
            </Flex>
          </Box>
        )}
      </Flex>
    </div>
  );
}

export default React.memo(ActiveTimeControl);
