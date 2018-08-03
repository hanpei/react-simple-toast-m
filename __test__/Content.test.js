import React from 'react';
import { shallow } from 'enzyme';
import Content from '../src/toast/Content';

describe('Content', () => {
  it('render', () => {
    const content = shallow(
      <Content>
        {() => <h1>content </h1>}
      </Content>
    );
    expect(content).toMatchSnapshot();
  });
});
