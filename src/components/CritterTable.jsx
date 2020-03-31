import React, { useContext, useMemo, useCallback } from 'react';
import { AutoSizer, MultiGrid } from 'react-virtualized';
import classNames from 'classnames';
import formattedData from './formatted-data';

import { StateContext } from '../reducer';
import CaughtCell from './cells/CaughtCell';
import {
  MONTH_FILTER_ACTIVE,
  MONTH_FILTER_EXPIRING,
  TYPE_FILTER_FISH,
  TYPE_FILTER_BUGS,
  HEMISPHERE_FILTER_NORTHERN,
  TIME_FORMAT_12,
} from './constants';
import PictureCell from './cells/PictureCell';
import MonthsCell from './cells/MonthsCell';
import TimeCell from './cells/TimeCell';

function getNextMonthIndex(monthIndex) {
  let nextMonthIndex = monthIndex + 1;
  if (nextMonthIndex > 11) nextMonthIndex = 0;
  return nextMonthIndex;
}

function CritterTable() {
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
  const getRowClassName = useCallback(
    ({ index }) => {
      if (index < 0) {
        //header;
        return 'header_cell';
      }
      const currentMonthActive = isCurrentMonthActive(
        tableData[index]?.activeMonths
      );

      const currentMonthExpiring = isCurrentMonthExpiring(
        tableData[index]?.activeMonths
      );

      return classNames('cell', {
        cell_month_active: currentMonthActive,
        cell_month_expiring: currentMonthExpiring,
        cell_month_inactive: !currentMonthActive,
      });
    },
    [isCurrentMonthActive, isCurrentMonthExpiring, tableData]
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
      <TimeCell activeHours={activeHours} activeHoursText={activeHoursText} />
    ),
    []
  );

  const monthRenderer = useCallback(
    ({ activeMonths }) => (
      <MonthsCell
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
      { label: 'Name', width: 110, renderer: 'name' },
      { label: 'Where', width: 110, renderer: 'location' },
      { label: 'Size', width: 50, renderer: 'shadow_size' },
      { label: 'Time', renderer: timeRenderer },
      { label: 'Month', width: 180, renderer: monthRenderer },
      { label: 'Price', width: 60, renderer: priceRenderer },
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
      const { label, renderer } = columns[columnIndex];
      const rowData = tableData[rowIndex - 1];
      let contents = `${columnIndex}, ${rowIndex}`;
      if (rowIndex === 0) {
        contents = label;
      } else if (typeof renderer === 'string') {
        contents = rowData[renderer];
      } else if (typeof renderer === 'function') {
        contents = renderer(rowData);
      }
      return (
        <div
          key={key}
          style={style}
          className={classNames(getRowClassName({ index: rowIndex - 1 }), {
            cell_first: columnIndex === 0,
            cell_padded: columnIndex === 3 || columnIndex === 4,
          })}
        >
          {contents}
        </div>
      );
    },
    [columns, getRowClassName, tableData]
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
            rowCount={tableData.length + 1}
            width={width}
            hideTopRightGridScrollbar
            hideBottomLeftGridScrollbar
            // Rerender, for some reason, only happens if row count changes. This is needed
            // to force a rerender when switching from fish to bugs with the same count
            // https://github.com/bvaughn/react-virtualized/issues/1262#issuecomment-561966273
            onRowsRendered={() => {}}
          />
        );
      }}
    </AutoSizer>
  );
}

export default React.memo(CritterTable);
