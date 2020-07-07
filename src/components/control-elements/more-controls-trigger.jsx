import React, { useCallback, useState } from 'react';

import { Button } from 'rebass';
import MoreControlsModal from '../more-controls-modal';

function MoreControlsTrigger({ setIsModalOpen, isModalOpen }) {
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, [setIsModalOpen]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  return (
    <React.Fragment>
      <Button
        padding={1}
        variant="outline"
        bg="white"
        color="black"
        width={30}
        fontSize={25}
        marginRight={1}
        lineHeight={1}
        onClick={openModal}
        style={{ cursor: 'pointer' }}
      >
        ☰
      </Button>
      {isModalOpen && <MoreControlsModal closeModal={closeModal} />}
    </React.Fragment>
  );
}

export default MoreControlsTrigger;
