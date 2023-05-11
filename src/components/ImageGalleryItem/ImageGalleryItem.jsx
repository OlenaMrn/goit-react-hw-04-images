import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

export function ImageGalleryItem({ url, tags, onClick }) {
  return (
    <>
      <li className={styles.item}>
        <img
          className={styles.imgGallery}
          src={url}
          alt={tags}
          // onClick={() => onClick(url)}
        />
      </li>
    </>
  );
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  // onClick: PropTypes.func.isRequired,
};




