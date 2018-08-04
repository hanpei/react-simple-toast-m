import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createToast from '../../src';
import styles from './index.css';

const fakeApi = () => new Promise((res) => {
  setTimeout(
    () => res({
      message: 'success',
      data: '心怀不惧，方能翱翔于天际',
    }),
    2000,
  );
});

@createToast()
class Demo extends Component {
  static propTypes = {
    showLoading: PropTypes.func.isRequired,
    hideLoading: PropTypes.func.isRequired,
    showToast: PropTypes.func.isRequired,
  };

  state = { data: undefined };

  callApi = () => {
    const { showLoading, hideLoading, showToast } = this.props;
    showLoading();
    fakeApi()
      .then(({ message, data }) => {
        hideLoading();
        showToast(message, () => {
          console.log('callback');
        });
        this.setState({ data });
      })
      .catch((err) => {
        hideLoading();
        console.log(err);
      });
  };

  render() {
    const { data } = this.state;
    const { showToast } = this.props;
    return (
      <div>
        <button type="button" className={styles.btn} onClick={this.callApi}>
          click to call api
        </button>
        <p>
          {data}
        </p>
        <br />
        <button type="button" className={styles.btn} onClick={() => showToast('hello world')}>
          hi
        </button>
      </div>
    );
  }
}

export default Demo;
