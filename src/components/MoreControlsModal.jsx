import React from 'react';
import { Button, Flex, Box } from 'rebass';

import ToggleHemisphere from './control-elements/ToggleHemisphere';
import ToggleTimeFormat from './control-elements/ToggleTimeFormat';
import ExportState from './control-elements/ExportState';
import ImportState from './control-elements/ImportState';

function MoreControlsModal({ closeModal }) {
  return (
    <div className="more_controls_modal">
      <Flex padding={2} flexDirection="column">
        <Box>
          <Button padding={0} onClick={closeModal} color="black" fontSize={25}>
            <span role="img" aria-label="close">
              ✖️
            </span>
          </Button>
        </Box>
        <Box>
          <ToggleHemisphere />
        </Box>
        <Box>
          <ToggleTimeFormat />
        </Box>
        <Box marginTop={20}>
          <ExportState />
        </Box>
        <Box>
          <ImportState />
        </Box>
      </Flex>
    </div>
  );
}

export default MoreControlsModal;
