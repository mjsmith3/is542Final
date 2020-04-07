import React from 'react';
import { render } from '@testing-library/react';
import Insertion from './insertion';

test('renders learn react link', () => {
  const { getByText } = render(<Insertion />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
