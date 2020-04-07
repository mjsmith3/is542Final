import React from 'react';
import { render } from '@testing-library/react';
import Graph from './graph';

test('renders learn react link', () => {
  const { getByText } = render(<Graph />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
