import { Blocks } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import styles from './Loader.module.css'

export function BlocksLoader() {
  return (
    <div className={styles.loader}>
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    </div>
  );
}

BlocksLoader.propTypes = {
  visible: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number,
  ariaLabel: PropTypes.string,
  wrapperStyle: PropTypes.object,
  wrapperClassName: PropTypes.string,
};