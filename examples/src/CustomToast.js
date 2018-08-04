import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomToast.css';

const CustomToast = ({ message }) => (
  <div className={styles.msg}>{message}</div>
);
CustomToast.propTypes = {
  message: PropTypes.string
};
CustomToast.defaultProps = {
  message: undefined
};

export default CustomToast;
