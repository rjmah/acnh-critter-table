import React from 'react';

function PictureCell({ number, type }) {
  return (
    <div>
      <img
        src={`${process.env.PUBLIC_URL}/${type}${number
          .toString()
          .padStart(2, '0')}.png`}
        alt=""
      />
    </div>
  );
}

export default React.memo(PictureCell);
