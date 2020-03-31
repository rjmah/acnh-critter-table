import React, { useRef, useContext } from 'react';

import { Input, Label } from '@rebass/forms';
import { StateContext } from '../../reducer';

function ExportState() {
  const inputRef = useRef();
  const state = useContext(StateContext);

  return (
    <div>
      <Label padding={1} htmlFor="export_state_input">
        Export State (Copy for other device)
      </Label>
      <Input
        id="export_state_input"
        style={{ borderRadius: 5 }}
        onSelect={() => {
          const inputElem = inputRef?.current;
          if (inputElem) {
            inputElem.setSelectionRange(0, inputElem.value.length);
          }
        }}
        ref={inputRef}
        value={state.storageValue}
        readOnly
      />
    </div>
  );
}

export default ExportState;
