import React from 'react';
import images from '../../img';

function PictureCell({ number, type }) {
  return (
    <div>
      <img
        src={images[`${type}${number.toString().padStart(2, '0')}`]}
        alt=""
      />
    </div>
  );
}

export default React.memo(PictureCell);
