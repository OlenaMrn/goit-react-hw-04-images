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
    `${BASE_URL}?q=${filter}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
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
  const perPage = 12;

  

  useEffect(() => {
    setImages([]);
    setTotalPages(0);
    setPage(1);
  }, [filter]);

  

  useEffect(() => {
    if (filter === '') return;
    setStatus('pending');
    setIsLoading(true);
    fetchImage(filter, page, perPage)
      .then(res => {
        if (!res.total) return [];
        setTotalPages(Math.ceil(res.total / perPage));
        return res.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
          id,
          webformatURL,
          largeImageURL,
          tags,
        }));
      })
      .then(res => {
        if (page !== 1) {
          setImages(prev => [...prev, ...res]);
        } else {
          setImages(res);
        }
        setStatus('resolved');
        setIsLoading(false);
      })
      .catch(error => {
        setStatus('rejected');
        setIsLoading(false);
      });
  }, [filter, page]);


  const clickOnLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

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
        {images.length > 0 ? (
          <ul className={styles.ImageGallery}>
            {images.map(({ id, largeImageURL, tags, webformatURL }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                url={largeImageURL}
                tags={tags}
              />
            ))}
          </ul>
        ) : (
          <div className={styles.wrap}>
            <img
              className={styles.imageError}
              src="https://rs.ui.ac.id/umum/files/promosi/20220325112709-1.jpeg"
              alt="404"
            />
          </div>
        )}
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
