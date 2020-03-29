import React from 'react';

import PreviewMonthSelect from './control-elements/PreviewMonthSelect';
import ToggleCaughtCheckbox from './control-elements/ToggleCaughtCheckbox';
import ToggleActiveExpiringSelect from './control-elements/ToggleActiveExpiringSelect';
import ToggleTypeSelect from './control-elements/ToggleTypeSelect';

function Controls() {
  return (
    <React.Fragment>
      <PreviewMonthSelect />
      <ToggleCaughtCheckbox />
      <ToggleActiveExpiringSelect />
      <ToggleTypeSelect />
    </React.Fragment>
  );
}

export default React.memo(Controls);
