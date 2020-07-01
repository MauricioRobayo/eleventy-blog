import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import styles from './App.module.css';
import Header from './components/Header';
import Menu from './components/Menu';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Portfolio, Page, PageName } from './types';
import { Api, ApiPortfolioRepository, Cache } from './utils';

const API_URL = 'https://gitconnected.com/v1/portfolio/mauriciorobayo';

const App: FunctionComponent = () => {
  let pages = useRef<Page[]>([
    {
      name: 'About',
    },
    {
      name: 'Projects',
    },
    {
      name: 'Contact',
    },
  ]);

  const initialPortfolio: Portfolio = {
    basics: {
      name: 'Mauricio Robayo',
    },
  };
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState(pages.current[0]);

  useEffect(() => {
    const api = new Api(API_URL);
    const cache = new Cache('portfolio', 60);
    const apiPortafolioRepository = new ApiPortfolioRepository(cache, api);
    apiPortafolioRepository
      .get()
      .then((portfolio) => {
        if (portfolio.basics.blog) {
          pages.current.push({ name: 'Blog', url: portfolio.basics.blog });
        }
        setPortfolio(portfolio);
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  const handleClick = (pageName: PageName): void => {
    setActivePage(pages.current.find(({ name }) => name === pageName) as Page);
  };

  const {
    basics: { name, email, summary, headline, profiles },
    projects,
  } = portfolio;

  if (!isLoading && error) {
    return <Header title={`Failed to fetch ${API_URL}`}></Header>;
  }

  return (
    <HashRouter>
      <div className={`${isLoading ? styles.loading : styles.loaded}`}>
        <Header title={name} profiles={profiles} isLoading={isLoading}></Header>
        {!isLoading && (
          <>
            <Menu
              pages={pages.current}
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
