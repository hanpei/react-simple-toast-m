import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import createToast, { withToast } from '../../src';
import styles from './index.css';
import CustomToast from './CustomToast';

import Demo from './Demo';

const WithToast = withToast()
const WithCustomToast = withToast({ custom: CustomToast });

class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h2>Demo</h2>
        <h3>decorator</h3>
        <Demo />
        <br />
        <br />
        <h3>prop render</h3>
        <WithToast>
          {({ showToast }) => (
            <button
              className={styles.btn}
              onClick={() => showToast('hello world again')}
            >
              hi again
            </button>
          )}
        </WithToast>
        <br />
        <br />
        <h3>custom Toast Component</h3>
        <WithCustomToast>
          {({ showToast, showLoading, hideLoading }) => (
            <Fragment>
              <button
                className={styles.btn}
                onClick={() => showToast('hello world')}
              >
                show custom message
              </button>
              <br />
              <br />
              <button
                className={styles.btn}
                onClick={() => {
                  showLoading();
                  setTimeout(() => {
                    hideLoading();
                  }, 2000);
                }}
              >
                show custom loader
              </button>
            </Fragment>
          )}
        </WithCustomToast>
        <br />
        <br />
      </div>
    );
  }
}



render(<App />, document.getElementById('root'));
