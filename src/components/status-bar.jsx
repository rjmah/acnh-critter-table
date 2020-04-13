import React, { useCallback, useContext } from 'react';
import { Flex, Box, Button } from 'rebass';
import { DispatchContext } from 'Reducer';
import { FILTER_RESET } from 'Reducer/actionTypes';

function StatusBar({ count = 0, hemisphere = 'Northern' }) {
  const dispatch = useContext(DispatchContext);

  const handleClickReset = useCallback(() => {
    dispatch({ type: FILTER_RESET });
  }, [dispatch]);

  return (
    <Flex
      fontSize={13}
      justifyContent="space-between"
      className="status_bar"
      alignItems="center"
    >
      <Box>
        Count: <b>{count}</b>
      </Box>
      <Box>
        Hemisphere: <b>{hemisphere}</b>
      </Box>
      <Box>
        <Button
          bg="rgb(51, 152, 247)"
          p={1}
          paddingLeft={1}
          paddingRight={1}
          onClick={handleClickReset}
          style={{ cursor: 'pointer', fontWeight: 600 }}
        >
          Reset Filters
        </Button>
      </Box>
    </Flex>
  );
}

export default StatusBar;
