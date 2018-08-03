import React from 'react';
import { getDisplayName } from '../src/toast/utils';

describe('getDisplayName', () => {
  it('run correctly', () => {
    const App = () => <h1>App</h1>;
    App.displayName = 'displayName';
    expect(getDisplayName(App)).toBe('displayName');

    App.displayName = undefined;
    expect(getDisplayName(App)).toBe('App');

    const App2 = 'nothing'
    expect(getDisplayName(App2)).toBe('Component');
  });
});
