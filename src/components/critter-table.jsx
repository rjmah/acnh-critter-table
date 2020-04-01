import React, {
  useState,
  useContext,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { AutoSizer, MultiGrid } from 'react-virtualized';
import classNames from 'classnames';
import formattedData from 'Data/formatted-data';

import { StateContext, DispatchContext } from 'Reducer';
import {
  BOOT_CURRENT_MONTH_INDEX,
  BOOT_CURRENT_HOUR_INDEX,
  BOOT_CURRENT_MINUTE_INDEX,
  MONTH_FILTER_ACTIVE,
  MONTH_FILTER_EXPIRING,
  TYPE_FILTER_FISH,
  TYPE_FILTER_BUGS,
  HEMISPHERE_FILTER_NORTHERN,
  TIME_FORMAT_12,
} from 'Utility/constants';
import CaughtCell from './cells/caught-cell';
import HeaderCell from './cells/header-cell';
import PictureCell from './cells/picture-cell';
import MonthCell from './cells/month-cell';
import TimeCell from './cells/time-cell';
import useInterval from 'useInterval';
import { CHANGE_PREVIEW_MONTH } from 'Reducer/actionTypes';
import StatusBar from './status-bar';

function getNextMonthIndex(monthIndex) {
  let nextMonthIndex = monthIndex + 1;
  if (nextMonthIndex > 11) nextMonthIndex = 0;
  return nextMonthIndex;
}

function CritterTable() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [currentMonth, setCurrentMonth] = useState(BOOT_CURRENT_MONTH_INDEX);
  const [currentHour, setCurrentHour] = useState(BOOT_CURRENT_HOUR_INDEX);
  const [currentMinute, setCurrentMinute] = useState(BOOT_CURRENT_MINUTE_INDEX);

  const updateCurrentTime = useCallback(() => {
    var d = new Date();
    setCurrentMonth(d.getMonth());
    setCurrentHour(d.getHours());
    setCurrentMinute(d.getMinutes());
  }, []);

  // Update active month if month changes when app is open
  useEffect(() => {
    if (
      state.previewMonthIndex === BOOT_CURRENT_MONTH_INDEX &&
      currentMonth !== BOOT_CURRENT_MONTH_INDEX
    ) {
      dispatch({ type: CHANGE_PREVIEW_MONTH, payload: currentMonth });
    }
  }, [currentMonth, dispatch, state.previewMonthIndex]);

  // Every minute, check current time to update the time graph
  useInterval(updateCurrentTime, 60000);

  // Check current time when window gains focus, since interval doesn't run in the background
  useEffect(() => {
    window.addEventListener('focus', updateCurrentTime);
    return () => window.removeEventListener('focus', updateCurrentTime);
  }, [updateCurrentTime]);

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

  const isCurrentTimeActive = useCallback(
    (activeHours) => activeHours.has(currentHour),
    [currentHour]
  );
  const localeAwareData = useMemo(
    () =>
      formattedData.map(
        ({
          activeMonthsNorth,
          activeMonthsSouth,
          activeHoursText12,
          activeHoursText24,
          ...rest
        }) => ({
          ...rest,
          activeMonths:
            state.hemisphereFilter === HEMISPHERE_FILTER_NORTHERN
              ? activeMonthsNorth
              : activeMonthsSouth,
          activeHoursText:
            state.timeFormat === TIME_FORMAT_12
              ? activeHoursText12
              : activeHoursText24,
        })
      ),
    [state.hemisphereFilter, state.timeFormat]
  );

  const tableData = useMemo(() => {
    const filteredData = localeAwareData.filter(
      ({ activeMonths, number, type, name, location }) => {
        let displayed = true;
        if (displayed && state.searchValue) {
          displayed =
            name.toLowerCase().includes(state.searchValue.toLowerCase()) ||
            location.toLowerCase().includes(state.searchValue.toLowerCase());
        }
        if (displayed && state.typeFilter) {
          if (state.typeFilter === TYPE_FILTER_FISH) {
            displayed = type === 'fish';
          } else if (state.typeFilter === TYPE_FILTER_BUGS) {
            displayed = type === 'bug';
          }
        }

        if (displayed && state.monthFilter) {
          if (state.monthFilter === MONTH_FILTER_ACTIVE) {
            displayed = isCurrentMonthActive(activeMonths);
          } else if (state.monthFilter === MONTH_FILTER_EXPIRING) {
            displayed = isCurrentMonthExpiring(activeMonths);
          }
        }
        if (displayed && state.hideCaught) {
          displayed = !state.caughtCritter[`${type}${number}`];
        }
        return displayed;
      }
    );
    return filteredData;
  }, [
    localeAwareData,
    state.searchValue,
    state.typeFilter,
    state.monthFilter,
    state.hideCaught,
    state.caughtCritter,
    isCurrentMonthActive,
    isCurrentMonthExpiring,
  ]);

  const sortFn = useCallback(
    (a, b) => {
      const isAsc = state.sortDirection === 1;
      let aVal = a[state.sortColumn];
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      let bVal = b[state.sortColumn];
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();

      if (aVal === bVal) return 0;

      if (!aVal) return 1;
      if (!bVal) return -1;

      if (aVal < bVal) {
        return isAsc ? -1 : 1;
      }

      if (aVal > bVal) {
        return isAsc ? 1 : -1;
      }
      return 0;
    },
    [state.sortColumn, state.sortDirection]
  );

  const sortedTableData = useMemo(() => {
    return state.sortDirection === 0 ? tableData : [...tableData].sort(sortFn);
  }, [sortFn, state.sortDirection, tableData]);

  const getRowClassName = useCallback(
    ({ index }) => {
      if (index < 0) {
        //header;
        return 'header_cell';
      }
      const currentMonthActive = isCurrentMonthActive(
        sortedTableData[index]?.activeMonths
      );

      const currentMonthExpiring = isCurrentMonthExpiring(
        sortedTableData[index]?.activeMonths
      );
      const currentTimeActive =
        currentMonthActive || currentMonthExpiring
          ? isCurrentTimeActive(sortedTableData[index]?.activeHours)
          : false;

      return classNames('cell', {
        cell_month_active: currentMonthActive,
        'cell_month_active--time_active':
          currentMonthActive && currentTimeActive,
        cell_month_expiring: currentMonthExpiring,
        'cell_month_expiring--time_active':
          currentMonthExpiring && currentTimeActive,
        cell_month_inactive: !currentMonthActive,
      });
    },
    [
      isCurrentTimeActive,
      isCurrentMonthActive,
      isCurrentMonthExpiring,
      sortedTableData,
    ]
  );

  const caughtRenderer = useCallback(
    ({ number, type }) => <CaughtCell number={number} type={type} />,
    []
  );
  const pictureRenderer = useCallback(
    ({ number, type }) => <PictureCell number={number} type={type} />,
    []
  );

  const timeRenderer = useCallback(
    ({ activeHours, activeHoursText }) => (
      <TimeCell
        activeHours={activeHours}
        activeHoursText={activeHoursText}
        currentHour={currentHour}
        currentMinute={currentMinute}
      />
    ),
    [currentHour, currentMinute]
  );

  const monthRenderer = useCallback(
    ({ activeMonths }) => (
      <MonthCell
        activeMonths={activeMonths}
        previewMonthIndex={state.previewMonthIndex}
      />
    ),
    [state.previewMonthIndex]
  );

  const priceRenderer = useCallback(({ value }) => value.toLocaleString(), []);

  const columns = useMemo(
    () => [
      { label: '🎣', width: 30, renderer: caughtRenderer },
      { label: '#', width: 30, renderer: 'number' },
      { label: 'Picture', renderer: pictureRenderer },
      { label: 'Name', sortKey: 'name', width: 110, renderer: 'name' },
      { label: 'Where', sortKey: 'location', width: 110, renderer: 'location' },
      {
        label: 'Size',
        sortKey: 'shadow_size',
        width: 50,
        renderer: 'shadow_size',
      },
      { label: 'Time', renderer: timeRenderer },
      { label: 'Month', width: 180, renderer: monthRenderer },
      { label: 'Price', sortKey: 'value', width: 60, renderer: priceRenderer },
    ],
    [
      caughtRenderer,
      monthRenderer,
      pictureRenderer,
      priceRenderer,
      timeRenderer,
    ]
  );

  const cellRenderer = useCallback(
    ({ columnIndex, key, rowIndex, style }) => {
      const { label, renderer, sortKey } = columns[columnIndex];
      const rowData = sortedTableData[rowIndex - 1];
      let contents = `${columnIndex}, ${rowIndex}`;
      const className = classNames(getRowClassName({ index: rowIndex - 1 }), {
        cell_first: columnIndex === 0,
        cell_padded: columnIndex === 3 || columnIndex === 4,
      });
      if (rowIndex === 0) {
        return (
          <HeaderCell
            key={key}
            sortKey={sortKey}
            label={label}
            className={className}
            style={style}
          />
        );
      } else if (typeof renderer === 'string') {
        contents = rowData[renderer];
      } else if (typeof renderer === 'function') {
        contents = renderer(rowData);
      }
      return (
        <div key={key} style={style} className={className}>
          {contents}
        </div>
      );
    },
    [columns, getRowClassName, sortedTableData]
  );

  const getColumnWidth = useCallback(
    ({ index }) => {
      return columns[index].width || 120;
    },
    [columns]
  );

  const getRowHeight = useCallback(({ columnIndex, key, index, style }) => {
    // Header
    if (index === 0) return 30;
    return 95;
  }, []);

  return (
    <React.Fragment>
      <StatusBar
        count={sortedTableData.length}
        hemisphere={
          state.hemisphereFilter === HEMISPHERE_FILTER_NORTHERN
            ? 'Northern'
            : 'Southern'
        }
      />
      <div className="table_container">
        <AutoSizer>
          {({ width, height }) => {
            return (
              <MultiGrid
                enableFixedRowScroll
                fixedRowCount={1}
                cellRenderer={cellRenderer}
                columnWidth={getColumnWidth}
                columnCount={columns.length}
                height={height}
                rowHeight={getRowHeight}
                rowCount={sortedTableData.length + 1}
                width={width}
                hideTopRightGridScrollbar
                hideBottomLeftGridScrollbar
                // Prevents flickering on horizontal scan on mobile
                overscanColumnCount={5}
                // Rerender, for some reason, only happens if row count changes. This is needed
                // to force a rerender when switching from fish to bugs with the same count
                // https://github.com/bvaughn/react-virtualized/issues/1262#issuecomment-561966273
                onRowsRendered={() => {}}
              />
            );
          }}
        </AutoSizer>
      </div>
    </React.Fragment>
  );
}

export default React.memo(CritterTable);
