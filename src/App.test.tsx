import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

const API_URL = 'https://gitconnected.com/v1/portfolio/mauriciorobayo';
jest.mock('./utils/api');

test('portfolio loads and renders', async () => {
  render(<App apiUrl={API_URL} />);

  const loadingHeading = screen.getByRole('heading', {
    name: 'Mauricio Robayo',
  });
  expect(loadingHeading).toBeInTheDocument();
  expect(loadingHeading).toHaveClass('loading');

  const loadingNavigation = screen.queryByRole('navigation');
  expect(loadingNavigation).toBe(null);

  const loadingLists = screen.queryAllByRole('listitem');
  expect(loadingLists.length).toBe(0);

  const loadedHeading = await screen.findByRole('heading', {
    name: 'Mauricio Robayo',
  });
  expect(loadedHeading).toBeInTheDocument();

  const loadedLists = await screen.findAllByRole('listitem');
  expect(loadedLists.length).toBe(3);

  const loadedNavigation = await screen.findByRole('navigation');
  expect(loadedNavigation).toBeInTheDocument();
});

test('an error is rendered if there is a problem getting course info', async () => {});
