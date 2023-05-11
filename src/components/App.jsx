import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

export function App() {
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
 

  const handleSearchSubmit = filter => {
    setFilter(filter);
  };

  const handleChange = e => {
    setFilter(e.target.value);
  };

  const toggleModal = largeImageURL => {
    setShowModal(prevShowModal => !prevShowModal);
    setModalImg(largeImageURL);
  };

  return (
    <div>
      <header>
        <Searchbar
          value={filter}
          onSubmit={handleSearchSubmit}
          onChange={handleChange}
        />
      </header>
      <main>
        <ImageGallery filter={filter} onClick={toggleModal} />
        {showModal && <Modal onClose={toggleModal} url={modalImg} />}
      </main>
      <ToastContainer />
    </div>
  );
}
