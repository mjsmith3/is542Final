import React from 'react';
import { render } from '@testing-library/react';
import Quick from './merge';

test('renders learn react link', () => {
  const { getByText } = render(<Quick />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
