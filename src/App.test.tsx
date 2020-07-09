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

    // Before loading

    const loadingHeading = screen.getByRole('heading', {
      name: 'Mauricio Robayo',
    });
    expect(loadingHeading).toBeInTheDocument();
    expect(loadingHeading).toHaveClass('loading');

    const loadingMenu = screen.queryByRole('navigation');
    expect(loadingMenu).toBe(null);

    const loadingProfiles = screen.queryByRole('list', { name: 'profiles' });
    expect(loadingProfiles).toBe(null);

    const loadingFooter = screen.queryByRole('contentinfo');
    expect(loadingFooter).toBe(null);

    // After loading

    const loadedHeading = await screen.findByRole('heading', {
      name: 'Mauricio Robayo',
    });
    expect(loadedHeading).toBeInTheDocument();
    expect(loadingHeading).not.toHaveClass('loading');

    const loadedProfiles = await screen.findByRole('list', {
      name: 'profiles',
    });
    expect(loadedProfiles).toBeInTheDocument();

    const profileItems = await screen.findAllByRole('listitem');
    expect(profileItems.length).toBe(3);
    profileItems.forEach((profileItem) => {
      expect(profileItem).toBeInTheDocument();
      expect(profileItem).toHaveClass('profileItem');
    });

    const loadedNavigation = await screen.getByRole('navigation');
    expect(loadedNavigation).toBeInTheDocument();

    const aboutMenuItem = await screen.findByRole('link', {
      name: 'About',
    });
    expect(aboutMenuItem).toBeInTheDocument();
    expect(aboutMenuItem).toHaveClass('selected');

    const projectsMenuItem = await screen.findByRole('link', {
      name: 'Projects',
    });
    expect(projectsMenuItem).toBeInTheDocument();
    expect(projectsMenuItem).not.toHaveClass('selected');

    const contactMenuItem = await screen.findByRole('link', {
      name: 'Contact',
    });
    expect(contactMenuItem).toBeInTheDocument();
    expect(contactMenuItem).not.toHaveClass('selected');

    const blogMenuItem = await screen.findByRole('link', {
      name: 'Blog',
    });
    expect(blogMenuItem).toBeInTheDocument();
    expect(blogMenuItem).not.toHaveClass('selected');

    fireEvent.click(projectsMenuItem);

    expect(aboutMenuItem).not.toHaveClass('selected');
    expect(projectsMenuItem).toHaveClass('selected');

    fireEvent.click(contactMenuItem);

    expect(projectsMenuItem).not.toHaveClass('selected');
    expect(contactMenuItem).toHaveClass('selected');

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
