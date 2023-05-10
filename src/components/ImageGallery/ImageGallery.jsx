import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { BlocksLoader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import styles from './ImageGallery.module.css';

const API_KEY = '34494219-18836f66a27c5c5fdb378157c';
const BASE_URL = 'https://pixabay.com/api/';

export class ImageGallery extends Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  state = {
    images: [],
    error: null,
    status: 'idle',
    page: 1,
    totalPages: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.filter !== this.props.filter) {
      this.setState({ status: 'pending', images: [], page: 1, totalPages: 0 });
      this.fetchImages(1);
    }
  }

  fetchImages = page => {
    fetch(
      `${BASE_URL}?q=${this.props.filter}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Nothing was found');
      })
      .then(data => {
        if (data.hits.length > 0) {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            status: 'resolved',
            totalPages: Math.ceil(data.totalHits / 12),
            page: page,
          }));
        } else {
          throw new Error('Nothing was found');
        }
      })
      .catch(error => {
        this.setState({ error, status: 'rejected' });
      });
  };

  clickOnLoadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      () => {
        this.fetchImages(this.state.page);
      }
    );
  };

  render() {
    const { images, status, page, totalPages } = this.state;

    if (status === 'idle') {
      // return <div style={{ textAlign: 'center'}}>Type search word</div>;
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
          <ul className={styles.ImageGallery}>
            {images.map(({ id, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                url={largeImageURL}
                tags={tags}
                onClick={this.props.onClick}
              />
            ))}
          </ul>
          {this.state.images.length !== 0 && page !== totalPages && (
            <Button onClick={this.clickOnLoadMore} />
          )}
        </div>
      );
    }
  }
}

