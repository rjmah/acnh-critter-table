import React, { useState, useCallback, useContext } from 'react';
import LZString from 'lz-string';

import { Label, Input } from '@rebass/forms';
import { Flex, Box, Button } from 'rebass';
import { DispatchContext } from '../../reducer';
import { IMPORT_STATE } from '../../reducer/actionTypes';

function ImportState() {
  const dispatch = useContext(DispatchContext);
  const [importInputText, setImportInputText] = useState('');

  const handleChange = useCallback((e) => {
    setImportInputText(e.target.value);
  }, []);

  const handleClick = useCallback(() => {
    // Validate that string decompresses to JSON
    try {
      JSON.parse(LZString.decompressFromBase64(importInputText));
    } catch (e) {
      alert('Invalid string provided. String decompresses to invalid JSON.');
    }

    dispatch({ type: IMPORT_STATE, payload: importInputText });
  }, [dispatch, importInputText]);

  return (
    <div>
      <Label padding={1} htmlFor="import_state_input">
        Import State (Paste from other device)
      </Label>
      <Flex>
        <Box paddingRight={1} flex="1 1 auto">
          <Input
            id="import_state_input"
            placeholder="From other device..."
            style={{ borderRadius: 5 }}
            onChange={handleChange}
            value={importInputText}
          />
        </Box>
        <Box marginLeft={1}>
          <Button
            bg="rgb(51, 152, 247)"
            style={{ fontWeight: 600 }}
            onClick={handleClick}
          >
            Import
          </Button>
        </Box>
      </Flex>
    </div>
  );
}

export default ImportState;
