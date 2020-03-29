import React, { useContext, useMemo, useCallback, useRef } from 'react';
import { AutoSizer, Table, Column } from 'react-virtualized';
import classNames from 'classnames';
import formattedData from './formatted-data';

import { StateContext } from '../reducer';
import CaughtCell from './cells/CaughtCell';
import { MONTH_FILTER_ACTIVE, MONTH_FILTER_EXPIRING } from './constants';
import PictureCell from './cells/PictureCell';
import MonthsCell from './cells/MonthsCell';
import TimeCell from './cells/TimeCell';
const COLUMN_WIDTH = 100;

function getNextMonthIndex(monthIndex) {
  let nextMonthIndex = monthIndex + 1;
  if (nextMonthIndex > 11) nextMonthIndex = 0;
  return nextMonthIndex;
}

function CritterTable() {
  const tableRef = useRef();
  const state = useContext(StateContext);

  const isCurrentMonthActive = useCallback(
    (activeMonths) => activeMonths.has(state.previewMonthIndex),
    [state.previewMonthIndex]
  );

  const isCurrentMonthExpiring = useCallback(
    (activeMonths) =>
      activeMonths.has(state.previewMonthIndex) &&
      !activeMonths.has(getNextMonthIndex(state.previewMonthIndex)),
    [state.previewMonthIndex]
  );

  const tableData = useMemo(() => {
    return formattedData.filter(({ activeMonths, number }) => {
      let displayed = true;
      if (displayed) {
        if (state.monthFilter === MONTH_FILTER_ACTIVE) {
          displayed = isCurrentMonthActive(activeMonths);
        } else if (state.monthFilter === MONTH_FILTER_EXPIRING) {
          displayed = isCurrentMonthExpiring(activeMonths);
        }
      }
      if (displayed && state.hideCaught) {
        displayed = !state.caughtFish[number];
      }
      return displayed;
    });
  }, [
    state.hideCaught,
    state.monthFilter,
    state.caughtFish,
    isCurrentMonthActive,
    isCurrentMonthExpiring,
  ]);
  const getRowClassName = useCallback(
    ({ index }) => {
      if (index < 0) {
        //header;
        return '';
      }
      const currentMonthActive = isCurrentMonthActive(
        tableData[index]?.activeMonths
      );

      const currentMonthExpiring = isCurrentMonthExpiring(
        tableData[index]?.activeMonths
      );

      return classNames('row', {
        row_month_active: currentMonthActive,
        row_month_expiring: currentMonthExpiring,
        row_month_inactive: !currentMonthActive,
      });
    },
    [isCurrentMonthActive, isCurrentMonthExpiring, tableData]
  );
  const rowGetter = useCallback(
    ({ index }) => {
      return tableData[index];
    },
    [tableData]
  );

  const caughtRenderer = useCallback(
    ({ cellData }) => <CaughtCell number={cellData} />,
    []
  );
  const pictureRenderer = useCallback(
    ({ cellData }) => <PictureCell number={cellData} />,
    []
  );

  const monthCellRenderer = useCallback(
    ({ cellData: activeMonths }) => (
      <MonthsCell
        activeMonths={activeMonths}
        previewMonthIndex={state.previewMonthIndex}
      />
    ),
    [state.previewMonthIndex]
  );

  const timeCellRenderer = useCallback(
    ({ cellData: activeHours, rowData: { activeHoursText } }) => (
      <TimeCell activeHours={activeHours} activeHoursText={activeHoursText} />
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
          height={height}
          // noRowsRenderer={this._noRowsRenderer}
          rowClassName={getRowClassName}
          rowHeight={120}
          rowGetter={rowGetter}
          rowCount={tableData.length}
          // scrollToIndex={scrollToIndex}
          // sort={this._sort}
          // sortBy={sortBy}
          // sortDirection={sortDirection}
          width={width}
        >
          <Column
            label="Caught?"
            dataKey="number"
            width={COLUMN_WIDTH}
            cellRenderer={caughtRenderer}
          />
          <Column label="Entry #" dataKey="number" width={COLUMN_WIDTH} />
          <Column
            label="Picture"
            dataKey="number"
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
            minWidth={100}
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
            flexGrow={1}
          />
        </Table>
      )}
    </AutoSizer>
  );
}

export default React.memo(CritterTable);
