const getNLengthArray = (n) => [...Array(n).keys()];

const fishData = require('./fish_data.json');
const bugData = require('./bug_data.json');
const fossilData = require('./fossil_data.json');
const FULL_YEAR_SET = new Set(getNLengthArray(12));
const FULL_DAY_ARRAY = getNLengthArray(24);
const FULL_DAY_SET = new Set(FULL_DAY_ARRAY);

function formatTime12(hourIndex) {
  let number = hourIndex % 12;
  number = number || 12;

  const suffix = hourIndex / 12 < 1 ? 'AM' : 'PM';
  return `${number}${suffix}`;
}

function formatTime24(hourIndex) {
  return `${hourIndex.toString().padStart(2, '0')}:00`;
}

function calculateActiveMonths(monthTuples, isSouth) {
  let activeMonths = new Set();
  monthTuples.forEach(([start, end]) => {
    if (start === 0 && end === 11) {
      activeMonths = FULL_YEAR_SET;
      return;
    }
    if (isSouth) {
      start = (start + 6) % 12;
      end = (end + 6) % 12;
    }

    while (start !== end) {
      activeMonths.add(start);
      start = (start + 1) % 12;
    }

    activeMonths.add(end);
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
    let activeHoursText12 = [];
    let activeHoursText24 = [];
    timeTuples.forEach(([start, end]) => {
      if (start === end) {
        activeHours = FULL_DAY_SET;
        activeHoursText12.push('All Day');
        activeHoursText24.push('All Day');
        return;
      }
      activeHoursText12.push(`${formatTime12(start)} - ${formatTime12(end)}`);
      activeHoursText24.push(`${formatTime24(start)} - ${formatTime24(end)}`);

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
      activeHoursText12,
      activeHoursText24,
      ...rest,
    };
  })
  .concat(fossilData.map((rowData) => ({ ...rowData, type: 'fossil' })));

export default formattedData;
