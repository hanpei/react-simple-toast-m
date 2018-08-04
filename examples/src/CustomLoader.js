import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomLoader.css';

const CustomLoader = () => (
  <div className={styles.mask}>
    <div className={styles.ripple}>
      <div />
      <div />
    </div>
  </div>
);
CustomLoader.propTypes = {
  message: PropTypes.string
};
CustomLoader.defaultProps = {
  message: undefined
};

export default CustomLoader;
