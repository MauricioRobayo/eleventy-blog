import React, { FunctionComponent, useState, useEffect } from 'react';
import styles from './App.module.css';
import Header from './components/Header';
import Menu from './components/Menu';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/footer';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { PortfolioData, Page, PageName } from './types';
import Portfolio from './utils/portfolio';

const portfolioApiUrl = 'https://gitconnected.com/v1/portfolio/mauriciorobayo';

const App: FunctionComponent = () => {
  const pages: Page[] = [
    {
      name: 'About',
      url: '',
    },
    {
      name: 'Projects',
      url: '',
    },
    {
      name: 'Contact',
      url: '',
    },
    {
      name: 'Blog',
      url: 'https://blog.mauriciorobayo.com',
    },
  ];

  const initialPortfolio: PortfolioData = {
    basics: {
      name: 'Mauricio Robayo',
    },
  };
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(pages[0]);

  useEffect(() => {
    const portafolio = new Portfolio(portfolioApiUrl, 60);
    portafolio.getPortfolio().then((newPortfolio) => {
      setIsLoading(false);
      if (!newPortfolio) {
        return;
      }
      setPortfolio(newPortfolio);
    });
  }, []);

  const handleClick = (pageName: PageName): void => {
    setActivePage(pages.find(({ name }) => name === pageName) as Page);
  };

  const {
    basics: { name, website, email, summary, headline, profiles },
    projects,
  } = portfolio;

  return (
    <HashRouter>
      <div className={`${isLoading ? styles.loading : styles.loaded}`}>
        <Header
          website={website}
          name={name}
          profiles={profiles}
          isLoading={isLoading}
        ></Header>
        {!isLoading && (
          <>
            <Menu
              pages={pages}
              activePage={activePage}
              onClick={handleClick}
            ></Menu>
            <Switch>
              <Route path="/about">
                <About summary={summary} headline={headline}></About>
              </Route>
              <Route path="/projects">
                <Projects projects={projects}></Projects>
              </Route>
              <Route path="/contact">
                <Contact email={email} profiles={profiles}></Contact>
              </Route>
              <Route path="/">
                <Redirect to="/about" />
              </Route>
            </Switch>
            <Footer></Footer>
          </>
        )}
      </div>
    </HashRouter>
  );
};

export default App;
