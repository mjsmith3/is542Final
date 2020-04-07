import React from 'react';
import { render } from '@testing-library/react';
import Selection from './selection';

test('renders learn react link', () => {
  const { getByText } = render(<Selection />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
