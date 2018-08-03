# react-simple-toast-m

react mobile toast, loader

## Demo

[Demo online](https://hanpei.github.io/react-simple-toast-m/)

## Usage

### HOC createToast

```js
import createToast from '../../src';

// ...
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
        <button className={styles.btn} onClick={this.callApi}>
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
```

### withToast Component

- default styles

```js
import { withToast } from '../../src';

const WithToast = withToast()

// props render
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
```

- custom Toast Component

```js
import { withToast } from '../../src';

const WithCustomToast = withToast({ custom: CustomToast });

<WithCustomToast>
  {({ showToast, showLoading, hideLoading }) => (
    <Fragment>
      <button className={styles.btn} onClick={() => showToast('hello world')}>
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
</WithCustomToast>;
```
