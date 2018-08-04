import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import styles from './Toast.css';
import { getDisplayName } from './utils';
import Content from './Content';

const createToast = (config = {}) => (WrappedComponent) => {
  const renderToastComponent = (message) => {
    const { toast: ToastCustomComponent, loader: LoaderCustomComponent } = config;

    if (message) {
      return ToastCustomComponent ? (
        <ToastCustomComponent message={message} />
      ) : (
        <DefaultToast message={message} />
      );
    }
    return LoaderCustomComponent ? <LoaderCustomComponent /> : <DefaultLoader />;
  };

  return class ToastHOC extends Component {
    static displayName = `WithToast(${getDisplayName(WrappedComponent)})`;

    constructor() {
      super();
      this.state = {
        toastShown: false,
        toastMessage: '',
      };
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
      const { toastShown } = this.state;
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = undefined;
      }
      if (toastShown) {
        this.setState({
          toastShown: false,
        });
      }
      document.body.removeChild(this.modalDiv);
    }

    showToast = (msg, callback) => {
      this.setState(
        {
          toastShown: true,
          toastMessage: msg,
        },
        () => {
          this.timerId = setTimeout(() => {
            this.setState(
              {
                toastShown: false,
                toastMessage: msg,
              },
              callback,
            );
          }, 1500);
        },
      );
    };

    showLoading = () => {
      this.setState({
        toastShown: true,
      });
    };

    hideLoading = () => {
      this.setState({
        toastShown: false,
      });
    };

    clearMsg = () => {
      this.setState({
        toastMessage: '',
      });
    };

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
          <Fragment>
            {createPortal(
              <Fade in={toastShown} handleExited={this.clearMsg}>
                <div>
                  {renderToastComponent(toastMessage)}
                </div>
              </Fade>,
              this.modalDiv,
            )}
          </Fragment>
        </Fragment>
      );
    }
  };
};

const DefaultLoader = () => (
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

const DefaultToast = ({ message }) => (
  <Fragment>
    <div className={styles.maskTransparent} />
    <div className={styles.toast}>
      <p className={styles.toastContent}>
        {message}
      </p>
    </div>
  </Fragment>
);
DefaultToast.propTypes = {
  message: PropTypes.string.isRequired,
};

const withToast = config => createToast(config)(Content);

export default createToast;
export { withToast, DefaultToast, DefaultLoader };

// slide animation
export const Fade = ({ in: inProp, children, handleExited }) => (
  <CSSTransition
    in={inProp}
    timeout={100}
    mountOnEnter
    unmountOnExit
    onExited={handleExited}
    classNames={{
      enter: styles.enter,
      enterActive: styles.enterActive,
      exit: styles.exit,
      exitActive: styles.exitActive,
    }}
  >
    {children}
  </CSSTransition>
);
Fade.propTypes = {
  in: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  handleExited: PropTypes.func.isRequired,
};
