import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ largeImageURL, tags, onClose }) {
  const handleClickBackdrop = useCallback(
    event => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
     window.addEventListener('click', handleClickBackdrop);

    return () => {
       window.removeEventListener('keydown', handleKeyDown);
       window.removeEventListener('click', handleClickBackdrop);
    };
  }, [onClose, handleClickBackdrop]);

  return createPortal(
    <div className={styles.Overlay} onClick={handleClickBackdrop}>
      <div className={styles.Modal}>
        <img src={largeImageURL} alt="Large" />
      </div>
    </div>,
    modalRoot
  );
}
