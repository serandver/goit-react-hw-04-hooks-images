import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Modal({ largeImage, imageName, toogleModal }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      toogleModal();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget != e.target) {
      toogleModal();
    }
  };

  return (
    <>
      <h1>Modal</h1>
      <div className="Overlay" onClick={handleBackdropClick}>
        <div className="Modal">
          <img src={largeImage} alt={imageName} />
        </div>
      </div>
    </>
  );
}

Modal.propTypes = {
  toogleModal: PropTypes.func,
  largeImage: PropTypes.string,
  imageName: PropTypes.string,
};
