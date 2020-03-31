import React, { useCallback, useContext } from 'react';
import { Flex, Box, Button } from 'rebass';
import { DispatchContext } from '../reducer';
import { FILTER_RESET } from '../reducer/actionTypes';

function StatusBar({ count = 0, hemisphere = 'Northern' }) {
  const dispatch = useContext(DispatchContext);

  const handleClickReset = useCallback(() => {
    dispatch({ type: FILTER_RESET });
  }, [dispatch]);

  return (
    <Flex
      paddingLeft={1}
      paddingRight={1}
      marginTop={2}
      marginBottom={2}
      marginLeft={1}
      marginRight={1}
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
          style={{ cursor: 'pointer' }}
        >
          <b>Reset Filters</b>
        </Button>
      </Box>
    </Flex>
  );
}

export default StatusBar;
