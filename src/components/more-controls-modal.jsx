import React, { useMemo, useCallback } from 'react';
import { Button, Flex, Box } from 'rebass';

import ToggleHemisphere from './control-elements/hemisphere-control';
import ToggleTimeFormat from './control-elements/hour-format-control';
import ExportState from './control-elements/export-state';
import ImportState from './control-elements/import-state';

function MoreControlsModal({ closeModal }) {
  const getLegendCell = useCallback(
    (emoji, text) => (
      <Box>
        <Flex alignItems="center">
          <Box>{emoji}</Box>
          <Box flexGrow={1}>{text}</Box>
        </Flex>
      </Box>
    ),
    []
  );
  const activeHourText = useMemo(
    () => getLegendCell('✅⏱', 'Available at this hour'),
    [getLegendCell]
  );
  const notActiveHourText = useMemo(
    () => getLegendCell('❌⏱', 'Not available at this hour'),
    [getLegendCell]
  );

  const activeMonthText = useMemo(
    () => getLegendCell('✅📅', 'Available in active month'),
    [getLegendCell]
  );
  const expiringMonthText = useMemo(
    () => getLegendCell('⌛️📅', 'Expiring at end of active month'),
    [getLegendCell]
  );
  const notActiveMonthText = useMemo(
    () => getLegendCell('❌📅', 'Not available in active month'),
    [getLegendCell]
  );
  return (
    <div className="more_controls_modal">
      <Flex padding={3} flexDirection="column" marginTop={20} marginBottom={40}>
        <Box>
          <Button
            padding={0}
            onClick={closeModal}
            color="black"
            bg="lightgray"
            fontSize={25}
            width={30}
            marginTop={-30}
            style={{ cursor: 'pointer', position: 'fixed' }}
          >
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
          <Flex flexDirection="column" textAlign="center">
            <Box p={2} fontSize={20}>
              Row Color Legend
            </Box>
            <Box p={2} bg="#9ce482">
              <Flex flexDirection="column">
                {activeHourText}
                {activeMonthText}
              </Flex>
            </Box>
            <Box p={2} bg="#d9ead3">
              <Flex flexDirection="column">
                {notActiveHourText}
                {activeMonthText}
              </Flex>
            </Box>
            <Box p={2} bg="#f8e19d">
              <Flex flexDirection="column">
                {activeHourText}
                {expiringMonthText}
              </Flex>
            </Box>
            <Box p={2} bg="#fff2cc">
              <Flex flexDirection="column">
                {notActiveHourText}
                {expiringMonthText}
              </Flex>
            </Box>
            <Box p={2} bg="#f4cccc">
              {notActiveMonthText}
            </Box>
          </Flex>
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
