import React, { useCallback, useRef } from 'react';
import { AutoSizer, Table, Column } from 'react-virtualized';
import classNames from 'classnames';
import formattedData from './formatted-data';
import images from '../img';
const COLUMN_WIDTH = 100;

const MONTHS = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May',
  'June',
  'July',
  'Aug.',
  'Sept.',
  'Oct.',
  'Nov.',
  'Dec.',
];
const getNLengthArray = (n) => [...Array(n).keys()];

const FULL_DAY_ARRAY = getNLengthArray(24);

var d = new Date();
const CURRENT_MONTH_INDEX = d.getMonth();
const CURRENT_HOUR_INDEX = d.getHours();
const CURRENT_MINUTE_INDEX = d.getMinutes();

let NEXT_MONTH_INDEX = CURRENT_MONTH_INDEX + 1;
if (NEXT_MONTH_INDEX > 11) NEXT_MONTH_INDEX = 0;
// const isNotActiveNextMonth = () => {

// }
function CritterTable() {
  const tableRef = useRef();
  const getRowClassName = useCallback(({ index }) => {
    if (index < 0) {
      //header;
      return '';
    }
    const currentMonthActive = formattedData[index]?.activeMonths.has(
      CURRENT_MONTH_INDEX
    );

    const nextMonthActive = formattedData[index]?.activeMonths.has(
      NEXT_MONTH_INDEX
    );
    return classNames('row', {
      row_month_active: currentMonthActive,
      row_month_expiring: currentMonthActive && !nextMonthActive,
      row_month_inactive: !currentMonthActive,
    });
  }, []);
  const rowGetter = useCallback(({ index }) => {
    return formattedData[index];
  }, []);
  const pictureRenderer = useCallback(({ rowIndex }) => {
    return (
      <div>
        <img
          src={images[`fish${(rowIndex + 1).toString().padStart(2, '0')}`]}
          alt=""
        />
      </div>
    );
  }, []);
  const monthCellRenderer = useCallback(
    ({ cellData: activeMonths }) => (
      <div className="month_container">
        {MONTHS.map((month, i) => (
          <div
            key={i}
            className={classNames('month_square', {
              'month_square--active': activeMonths.has(i),
              'month_square--current': i === CURRENT_MONTH_INDEX,
            })}
          >
            {month}
          </div>
        ))}
      </div>
    ),
    []
  );
  const timeCellRenderer = useCallback(
    ({ cellData: activeHours }) => (
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
            left:
              4 * CURRENT_HOUR_INDEX + Math.floor(CURRENT_MINUTE_INDEX / 15),
          }}
        />
      </div>
    ),
    []
  );
  const priceRenderer = useCallback(
    ({ cellData }) => cellData.toLocaleString(),
    []
  );
  return (
    <AutoSizer>
      {({ width, height }) => (
        <Table
          ref={tableRef}
          // headerClassName={styles.headerColumn}
          headerHeight={30}
          height={500}
          // noRowsRenderer={this._noRowsRenderer}
          rowClassName={getRowClassName}
          rowHeight={120}
          rowGetter={rowGetter}
          rowCount={80}
          // scrollToIndex={scrollToIndex}
          // sort={this._sort}
          // sortBy={sortBy}
          // sortDirection={sortDirection}
          width={width}
        >
          <Column label="Entry #" dataKey="number" width={COLUMN_WIDTH} />
          <Column
            label="Picture"
            width={COLUMN_WIDTH}
            cellRenderer={pictureRenderer}
          />
          <Column label="Name" dataKey="name" width={COLUMN_WIDTH} />
          <Column label="Location" dataKey="location" width={COLUMN_WIDTH} />
          <Column label="Shadow" dataKey="shadow_size" width={COLUMN_WIDTH} />
          <Column
            label="Time Available"
            dataKey="activeHours"
            width={COLUMN_WIDTH}
            cellRenderer={timeCellRenderer}
          />
          <Column
            label="Months Available"
            dataKey="activeMonths"
            width={320}
            cellRenderer={monthCellRenderer}
          />
          <Column
            label="Selling Price"
            dataKey="value"
            width={COLUMN_WIDTH}
            cellRenderer={priceRenderer}
          />
        </Table>
      )}
    </AutoSizer>
  );
}

export default CritterTable;
