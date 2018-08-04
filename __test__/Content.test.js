import React from 'react';
import { shallow } from 'enzyme';
import Content from '../src/toast/Content';

describe('Content', () => {
  it('render', () => {
    const App = <Content>{() => <h1>something test</h1>}</Content>;
    const content = shallow(App);
    expect(content).toMatchSnapshot();
  });
});
