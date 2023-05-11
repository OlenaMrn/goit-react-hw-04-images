import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { BlocksLoader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import styles from './ImageGallery.module.css';

const API_KEY = '34494219-18836f66a27c5c5fdb378157c';
const BASE_URL = 'https://pixabay.com/api/';

function fetchImage(filter, page, perPage) {
  return fetch(
    `${BASE_URL}/?q=${filter}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error('Nothing found. Try another query'));
  });
}

export function ImageGallery({ filter }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState('idle');
  const [isLoading, setIsLoading] = useState(false);
   const [firstRecivedImage, setFirstRecivedImage] = useState(null);
  const perPage = 12;


  useEffect(() => {
    document.getElementById(firstRecivedImage)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [firstRecivedImage]);

  useEffect(() => {
    setImages([]);
    setPage(1);
    setTotalPages(0);
    setStatus('pending');
    setIsLoading(true);

   

    fetchImage(filter, 1, perPage)
      .then(responseImages => {
       
        setImages(responseImages.hits);
        setTotalPages(Math.ceil(responseImages.totalHits / perPage));
        setFirstRecivedImage(responseImages.hits[0].id);
        setStatus('resolved');
      })
      .catch(error => {
        setStatus('rejected');
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, [filter]);

  const clickOnLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (page !== 1) {
      fetchImage(filter, page, perPage)
        .then(responseImages => {
          setImages(prevImages => [...prevImages, ...responseImages.hits]);
          setStatus('resolved');
        })
        .catch(error => {
          setStatus('rejected');
          console.error(error);
        });
    }
  }, [filter, page]);

  if (status === 'idle') {
    return null;
  }

  if (status === 'pending') {
    return (
      <div>
        <BlocksLoader />
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div className={styles.wrap}>
        <img
          className={styles.imageError}
          src="https://rs.ui.ac.id/umum/files/promosi/20220325112709-1.jpeg"
          alt="404"
        />
      </div>
    );
  }

  if (status === 'resolved') {
    return (
      <div>
        <div>{isLoading && <BlocksLoader />}</div>
        <ul className={styles.ImageGallery}>
          {images.map(({ id, largeImageURL, tags }) => (
            <ImageGalleryItem key={id} url={largeImageURL} tags={tags} />
          ))}
        </ul>
        {images.length !== 0 && page !== totalPages && (
          <Button onClick={clickOnLoadMore} />
        )}
      </div>
    );
  }

  return null;
}

ImageGallery.propTypes = {
  filter: PropTypes.string.isRequired,
};




