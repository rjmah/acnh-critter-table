const getNLengthArray = (n) => [...Array(n).keys()];

const data = require('../data.json');
const FULL_YEAR_SET = new Set(getNLengthArray(12));
const FULL_DAY_ARRAY = getNLengthArray(24);
const FULL_DAY_SET = new Set(FULL_DAY_ARRAY);

function formatTime(hourIndex) {
  let number = hourIndex % 12;
  number = number || 12;

  const suffix = hourIndex / 12 < 1 ? 'AM' : 'PM';
  return `${number}${suffix}`;
}
// TODO do this once on load
const formattedData = data.map(
  ({ month: monthTuples, time: timeTuples, ...rest }) => {
    let activeMonths = new Set();
    monthTuples.forEach(([start, end]) => {
      if (start === 1 && end === 12) {
        activeMonths = FULL_YEAR_SET;
        return;
      }

      while (start !== end) {
        activeMonths.add(start - 1);
        start++;
        if (start > 12) {
          start = 1;
        }
      }

      activeMonths.add(end - 1);
    });

    let activeHours = new Set();
    let activeHoursText = [];
    timeTuples.forEach(([start, end]) => {
      if (start === end) {
        activeHours = FULL_DAY_SET;
        activeHoursText.push('All Day');
        return;
      }
      activeHoursText.push(`${formatTime(start)} - ${formatTime(end)}`);

      while (start !== end) {
        activeHours.add(start);
        start++;
        if (start > 23) {
          start = 0;
        }
      }
      // don't include end for time
    });

    return {
      activeMonths,
      activeHours,
      activeHoursText,
      ...rest,
    };
  }
);

export default formattedData;
