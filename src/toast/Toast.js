import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styles from './Toast.css';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const createToast = config => WrappedComponent => {
  return class ToastHOC extends Component {
    static displayName = `WithToast(${getDisplayName(WrappedComponent)})`
    state = {
      toastShown: false,
      toastMessage: ''
    };

    constructor() {
      super();
      const div = document.getElementById('react-simple-toast-container');
      if (div) {
        this.modalDiv = div;
      } else {
        this.modalDiv = document.createElement('div');
        this.modalDiv.setAttribute('id', 'react-simple-toast-container');
      }
      document.body.appendChild(this.modalDiv);
    }

    componentWillUnmount() {
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = undefined;
      }
      if (this.state.toastShown) {
        this.setState({
          toastShown: false
        });
      }
      document.body.removeChild(this.modalDiv);
    }
    showToast = (msg, callback) => {
      this.setState(
        {
          toastShown: true,
          toastMessage: msg
        },
        () => {
          this.timerId = setTimeout(() => {
            this.setState(
              {
                toastShown: false,
                toastMessage: ''
              },
              callback
            );
          }, 1500);
        }
      );
    };
    showLoading = () => {
      this.setState({
        toastShown: true
      });
    };
    hideLoading = () => {
      this.setState({
        toastShown: false
      });
    };

    renderToastComponent(toastMessage) {
      let ToastComponent;
      if (config && config.custom) {
        ToastComponent = config.custom;
      } else {
        ToastComponent = DefaultToast;
      }
      return <ToastComponent message={toastMessage} />;
    }

    render() {
      const { toastShown, toastMessage } = this.state;
      return (
        <Fragment>
          <WrappedComponent
            showToast={this.showToast}
            showLoading={this.showLoading}
            hideLoading={this.hideLoading}
            {...this.props}
          />
          {toastShown &&
            createPortal(
              this.renderToastComponent(toastMessage),
              this.modalDiv
            )}
        </Fragment>
      );
    }
  };
};

const DefaultToast = ({ message }) => {
  return message ? (
    <Fragment>
      <div className={styles.maskTransparent} />
      <div className={styles.toast}>
        <p className={styles.toastContent}>{message}</p>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div className={styles.maskTransparent} />
      <div className={styles.toast}>
        <div className={styles.toastContent}>
          <div className={styles.spinner}>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default createToast;
