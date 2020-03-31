import React, { useCallback, useState } from 'react';

import { Button } from 'rebass';
import MoreControlsModal from '../MoreControlsModal';

function MoreControlsModalButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

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
      >
        ☰
      </Button>
      {isModalOpen && <MoreControlsModal closeModal={closeModal} />}
    </React.Fragment>
  );
}

export default MoreControlsModalButton;
