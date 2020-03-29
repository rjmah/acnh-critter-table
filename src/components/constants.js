const getNLengthArray = (n) => [...Array(n).keys()];

export const FULL_DAY_ARRAY = getNLengthArray(24);

var d = new Date();
export const CURRENT_MONTH_INDEX = d.getMonth();
export const CURRENT_HOUR_INDEX = d.getHours();
export const CURRENT_MINUTE_INDEX = d.getMinutes();
export const MONTH_FILTER_ACTIVE = 'MONTH_FILTER_ACTIVE';
export const MONTH_FILTER_EXPIRING = 'MONTH_FILTER_EXPIRING';
export const TYPE_FILTER_FISH = 'TYPE_FILTER_FISH';
export const TYPE_FILTER_BUGS = 'TYPE_FILTER_BUGS';

export const HEMISPHERE_FILTER_NORTHERN = 'HEMISPHERE_FILTER_NORTHERN';
export const HEMISPHERE_FILTER_SOUTHERN = 'HEMISPHERE_FILTER_SOUTHERN';
