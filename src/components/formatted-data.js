const getNLengthArray = (n) => [...Array(n).keys()];

const fishData = require('../fish_data.json');
const bugData = require('../bug_data.json');
const FULL_YEAR_SET = new Set(getNLengthArray(12));
const FULL_DAY_ARRAY = getNLengthArray(24);
const FULL_DAY_SET = new Set(FULL_DAY_ARRAY);

function formatTime(hourIndex) {
  let number = hourIndex % 12;
  number = number || 12;

  const suffix = hourIndex / 12 < 1 ? 'AM' : 'PM';
  return `${number}${suffix}`;
}

function calculateActiveMonths(monthTuples, isSouth) {
  let activeMonths = new Set();
  monthTuples.forEach(([start, end]) => {
    //TODO convert monthTuple to start at 0 so we don't have to do this dumb stuff
    if (isSouth) {
      start = (start + 6) % 12;
      if (start === 0) start = 12;
      end = (end + 6) % 12;
      if (end === 0) end = 12;
    }
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

  return activeMonths;
}

const formattedData = fishData
  .map((rowData) => ({ ...rowData, type: 'fish' }))
  .concat(bugData.map((rowData) => ({ ...rowData, type: 'bug' })))
  .map(({ month: monthTuples, time: timeTuples, ...rest }) => {
    const activeMonthsNorth = calculateActiveMonths(monthTuples, false);
    const activeMonthsSouth = calculateActiveMonths(monthTuples, true);

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
      activeMonthsNorth,
      activeMonthsSouth,
      activeHours,
      activeHoursText,
      ...rest,
    };
  });

export default formattedData;
