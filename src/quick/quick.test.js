import React from 'react';
import { render } from '@testing-library/react';
import Bubble from './bubble';

test('renders learn react link', () => {
  const { getByText } = render(<Bubble />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
