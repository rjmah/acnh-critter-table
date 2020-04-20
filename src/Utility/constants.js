export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

const getNLengthArray = (n) => [...Array(n).keys()];
export const FULL_DAY_ARRAY = getNLengthArray(24);

var d = new Date();
export const BOOT_CURRENT_MONTH_INDEX = d.getMonth();
export const BOOT_CURRENT_HOUR_INDEX = d.getHours();
export const BOOT_CURRENT_MINUTE_INDEX = d.getMinutes();
export const MONTH_FILTER_ACTIVE = 'MONTH_FILTER_ACTIVE';
export const MONTH_FILTER_EXPIRING = 'MONTH_FILTER_EXPIRING';
export const TYPE_FILTER_FISH = 'TYPE_FILTER_FISH';
export const TYPE_FILTER_BUGS = 'TYPE_FILTER_BUGS';
export const TYPE_FILTER_FOSSILS = 'TYPE_FILTER_FOSSILS';

export const HEMISPHERE_FILTER_NORTHERN = 'HEMISPHERE_FILTER_NORTHERN';
export const HEMISPHERE_FILTER_SOUTHERN = 'HEMISPHERE_FILTER_SOUTHERN';

export const TIME_FORMAT_12 = 'TIME_FORMAT_12';
export const TIME_FORMAT_24 = 'TIME_FORMAT_24';
