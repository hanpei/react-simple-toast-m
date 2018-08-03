import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createToast from '../../src';
import styles from './index.css';

const fakeApi = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      return res({
        message: 'success',
        data: '心怀不惧，方能翱翔于天际'
      });
    }, 2000);
  });
};

@createToast()
class Demo extends Component {
  static propTypes = {
    showLoading: PropTypes.func.isRequired,
    hideLoading: PropTypes.func.isRequired,
    showToast: PropTypes.func.isRequired
  };
  state = { data: undefined };
  callApi = () => {
    this.props.showLoading();
    fakeApi()
      .then(({ message, data }) => {
        this.props.hideLoading();
        this.props.showToast(message, () => {
          console.log('callback');
        });
        this.setState({ data });
      })
      .catch(err => {
        this.props.hideLoading();
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <button
          className={styles.btn}
          onClick={this.callApi}
        >
          click to call api
        </button>
        <p>{this.state.data}</p>
        <br />
        <button
          className={styles.btn}
          onClick={() => this.props.showToast('hello world')}
        >
          hi
        </button>
      </div>
    );
  }
}





export default Demo;