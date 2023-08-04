import React from 'react';
import { render } from '@testing-library/react';
import MenuItemTemplate from './MenuItemTemplate';
import { MemoryRouter, Route } from 'react-router-dom';

test('MenuItemTemplate renders without crashing', () => {
  render(
    <MemoryRouter initialEntries={['/details/Fanta']}>
      <Route path="/details/:title">
        <MenuItemTemplate />
      </Route>
    </MemoryRouter>
  );
});
