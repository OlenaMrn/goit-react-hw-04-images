import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ url, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <li className={styles.item}>
        <img
          className={styles.imgGallery}
          src={url}
          alt={tags}
          onClick={openModal}
        />
        {isModalOpen && (
          <Modal largeImageURL={url} tags={tags} onClose={closeModal} />
        )}
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  
};
