import React from 'react';
import { Flex, Box } from 'rebass';
import PreviewMonthSelect from './control-elements/PreviewMonthSelect';
import ToggleCaughtCheckbox from './control-elements/ToggleCaughtCheckbox';
import ToggleActiveExpiringSelect from './control-elements/ToggleActiveExpiringSelect';
import ToggleTypeSelect from './control-elements/ToggleTypeSelect';
import SearchInput from './control-elements/SearchInput';
import MoreControlsModalButton from './control-elements/MoreControlsModalButton';

function Controls() {
  return (
    <Flex margin={2} flexWrap="wrap" width="100%">
      <Box paddingBottom={0} width={[1]}>
        <Flex>
          <Box>
            <MoreControlsModalButton />
          </Box>
          <Box flex="1 1 auto">
            <SearchInput />
          </Box>
        </Flex>
      </Box>
      <Box paddingRight={1} width={[1 / 4]}>
        <PreviewMonthSelect />
      </Box>
      <Box paddingRight={1} width={[1 / 4]}>
        <ToggleCaughtCheckbox />
      </Box>
      <Box paddingRight={2} width={[1 / 4]}>
        <ToggleActiveExpiringSelect />
      </Box>
      <Box width={[1 / 4]}>
        <ToggleTypeSelect />
      </Box>
    </Flex>
  );
}

export default React.memo(Controls);
