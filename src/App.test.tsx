import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

jest.mock('./utils/api');
jest.mock('./utils/cache');

describe('Button', () => {
  test('portfolio loads and renders', async () => {
    render(
      <App apiUrl="https://gitconnected.com/v1/portfolio/mauriciorobayo" />
    );

    const loadingHeading = screen.getByRole('heading', {
      name: 'Mauricio Robayo',
    });
    expect(loadingHeading).toBeInTheDocument();
    expect(loadingHeading).toHaveClass('loading');

    const loadingNavigation = screen.queryByRole('navigation');
    expect(loadingNavigation).toBe(null);

    const loadingProfiles = screen.queryByRole('list', { name: 'profiles' });
    expect(loadingProfiles).toBe(null);

    const loadingFooter = screen.queryByRole('contentinfo');
    expect(loadingFooter).toBe(null);

    // Include all elements that should not be loaded

    const loadedHeading = await screen.findByRole('heading', {
      name: 'Mauricio Robayo',
    });
    expect(loadedHeading).toBeInTheDocument();
    expect(loadingHeading).not.toHaveClass('loading');

    const profiles = await screen.findByRole('list', { name: 'profiles' });
    expect(profiles).toBeInTheDocument();

    const profileItems = await screen.findAllByRole('listitem');
    expect(profileItems.length).toBe(3);
    profileItems.forEach((profile) => {
      expect(profile.classList.contains('profileItem')).toBe(true);
    });

    const loadedNavigation = await screen.findByRole('navigation');
    expect(loadedNavigation).toBeInTheDocument();

    const aboutMenuItem = await screen.findByRole('link', {
      name: 'About',
    });
    const projectsMenuItem = await screen.findByRole('link', {
      name: 'Projects',
    });

    expect(aboutMenuItem).toBeInTheDocument();
    expect(projectsMenuItem).toBeInTheDocument();
    expect(aboutMenuItem).toHaveClass('selected');
    expect(projectsMenuItem).not.toHaveClass('selected');

    fireEvent.click(projectsMenuItem);

    expect(aboutMenuItem).not.toHaveClass('selected');
    expect(projectsMenuItem).toHaveClass('selected');

    const loadedFooter = await screen.findByRole('contentinfo');
    expect(loadedFooter).toBeInTheDocument();
  });

  test('an error is rendered if there is a problem getting course info', async () => {
    const wrongUrl = 'https://wrong-url';
    render(<App apiUrl={wrongUrl} />);
    const loadingHeading = screen.getByRole('heading', {
      name: 'Mauricio Robayo',
    });
    expect(loadingHeading).toBeInTheDocument();
    expect(loadingHeading).toHaveClass('loading');

    const loadingNavigation = screen.queryByRole('navigation');
    expect(loadingNavigation).toBe(null);

    const loadingLists = screen.queryAllByRole('listitem');
    expect(loadingLists.length).toBe(0);

    const loadedHeading = await screen.findByText('Test error');
    expect(loadedHeading).toBeInTheDocument();

    const link = await screen.findByRole('link', { name: wrongUrl });
    expect(link).toBeInTheDocument();
  });
});
