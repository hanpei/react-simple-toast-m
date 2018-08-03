import React from 'react';
import { shallow } from 'enzyme';
import createToast, { withToast } from '../src/index';
import { DefaultToast } from '../src/toast/Toast';

describe('createToast', () => {
  it('DefaultToast', () => {
    const toast = shallow(<DefaultToast message="hello world" />);
    expect(toast).toMatchSnapshot();
    toast.unmount();
    const toast2 = shallow(<DefaultToast />);
    expect(toast2).toMatchSnapshot();
    toast.unmount();
  });

  it('displayName', () => {
    const App = () => <h1>app</h1>;
    App.displayName = 'nameOfComponent';
    const AppWithToast = createToast()(App);
    const component = shallow(<AppWithToast />);
    expect(AppWithToast.displayName).toBe('WithToast(nameOfComponent)');
  });

  it('injected props', () => {
    jest.useFakeTimers();
    const App = () => <h1>app</h1>;
    const AppWithToast = createToast()(App);
    const component = shallow(<AppWithToast />);
    const app = component.find('App');
    app.props().showLoading();
    expect(component).toMatchSnapshot();
    app.props().hideLoading();
    expect(component).toMatchSnapshot();
    app.props().showToast('abcdefg');
    expect(component).toMatchSnapshot();

    const callback = jest.fn();
    app.props().showToast('abcdefg', callback);
    jest.runAllTimers();
    expect(callback).toBeCalled();
  });

  it('life circle', () => {
    const App = () => <h1>app</h1>;
    const AppWithToast = createToast()(App);
    const fn = jest.spyOn(AppWithToast.prototype, 'componentWillUnmount');
    const component = shallow(<AppWithToast />);
    const app = component.find('App');
    app.props().showToast('abcd');
    app.unmount();
    expect(fn).toBeCalled();
    expect(component).toMatchSnapshot();
  });

  it('custom Toast', () => {
    const App = () => <h1>app</h1>;
    const Custom = () => <h1>custom toast</h1>;
    const AppWithCustomToast = createToast({ custom: Custom })(App);
    const component = shallow(<AppWithCustomToast />);
    expect(component).toMatchSnapshot();
    const app = component.find('App');
    app.props().showToast('abcd');
    expect(app).toMatchSnapshot();
  });

  it('hoc', () => {
    const App = () => <h1>app</h1>;
    const AppWithToast = createToast()(App);
    const component = shallow(<AppWithToast />);
    expect(component).toMatchSnapshot();
    const app = component.find('App');
    const props = component.find('App').props();
    expect(Object.keys(props)).toContain(
      'showToast',
      'showLoading',
      'hideLoading'
    );
    expect(component).toMatchSnapshot();

    const div = document.getElementById('react-simple-toast-container');
    expect(div).toBeDefined();

    component.unmount();
    const div2 = document.getElementById('react-simple-toast-container');
    expect(div2).toBeNull();
  });

  it('withToast', () => {
    const App = () => <h1>app</h1>;
    const Custom = () => <h1>custom toast</h1>;

    const WithToast = withToast();
    const WithCustomToast = withToast({ custom: Custom });
    const WithToastDemo = () => (
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
    );
  
    const component = shallow(<WithToastDemo />);
    expect(component).toMatchSnapshot();

  });
});
