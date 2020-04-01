import React from 'react';
import { Flex, Box } from 'rebass';
import MoreControlsTrigger from './control-elements/more-controls-trigger';
import SearchInput from './control-elements/search-input';
import ActiveMonthControl from './control-elements/active-month-control';
import HideCaughtControl from './control-elements/hide-caught-control';
import AvailibilityControl from './control-elements/availibility-control';
import CritterTypeControl from './control-elements/critter-type-control';

function Controls() {
  return (
    <Flex flexWrap="wrap" width="100%">
      <Box paddingBottom={0} width={[1]}>
        <Flex>
          <Box>
            <MoreControlsTrigger />
          </Box>
          <Box flex="1 1 auto">
            <SearchInput />
          </Box>
        </Flex>
      </Box>
      <Box paddingRight={1} width={[1 / 4]}>
        <ActiveMonthControl />
      </Box>
      <Box paddingRight={1} width={[1 / 4]}>
        <HideCaughtControl />
      </Box>
      <Box paddingRight={2} width={[1 / 4]}>
        <AvailibilityControl />
      </Box>
      <Box width={[1 / 4]}>
        <CritterTypeControl />
      </Box>
    </Flex>
  );
}

export default React.memo(Controls);
