import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomToast.css';

const CustomToast = ({ message }) => {
  return message ? (
    <div>
      <p
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'orange',
          borderRadius: '3px',
          padding: '5px 10px',
          color: '#fff'
        }}
      >
        {message}
      </p>
    </div>
  ) : (
    <div style={{
      position: 'absolute',
      zIndex: '99',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgb(000,000,000,0.3)',
    }}>
      <div className={styles.ripple}>
        <div />
        <div />
      </div>
    </div>
  );
};
CustomToast.propTypes = {
  message: PropTypes.string
};
CustomToast.defaultProps = {
  message: undefined
};

export default CustomToast;
