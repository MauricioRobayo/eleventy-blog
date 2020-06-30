import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('./utils/portfolio');

test('renders loading app while fetching data', () => {
  const { getByText, queryAllByRole, queryByRole } = render(<App />);
  const header = getByText('Mauricio Robayo');
  const listitems = queryAllByRole('listitem');
  const navigation = queryByRole('navigation');
  expect(header).toBeInTheDocument();
  expect(header).toHaveClass('loading');
  expect(listitems.length).toBe(0);
  expect(navigation).toBe(null);
});

test('renders loaded app after fetching data', async () => {
  const { getByText, findAllByRole, findByRole } = render(<App />);
  const header = getByText('Mauricio Robayo');
  const listitems = await findAllByRole('listitem');
  const navigation = await findByRole('navigation');
  expect(header).toBeInTheDocument();
  expect(header).not.toHaveClass('loading');
  expect(listitems.length).toBe(3);
  expect(navigation).toBeInTheDocument();
});
