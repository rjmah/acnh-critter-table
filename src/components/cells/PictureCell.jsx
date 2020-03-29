import React from 'react';
import images from '../../img';

function PictureCell({ number }) {
  return (
    <div>
      <img src={images[`fish${number.toString().padStart(2, '0')}`]} alt="" />
    </div>
  );
}

export default React.memo(PictureCell);
