import React, { FunctionComponent, useState, useRef } from 'react';
import styles from './App.module.css';
import Header from './components/Header';
import Menu from './components/Menu';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Error from './components/Error';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Portfolio, Page, PageName } from './types';
import { usePorfolioApi } from './utils/usePorfolioApi';

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

  const [activePage, setActivePage] = useState(pages.current[0]);
  const { portfolio, loading, error, url } = usePorfolioApi(initialPortfolio);

  const handleClick = (pageName: PageName): void => {
    setActivePage(pages.current.find(({ name }) => name === pageName) as Page);
  };

  const {
    basics: { name, email, summary, headline, profiles },
    projects,
  } = portfolio;

  if (error) {
    return <Error message={error} url={url}></Error>;
  }

  return (
    <HashRouter>
      <div className={`${loading ? styles.loading : styles.loaded}`}>
        <Header title={name} profiles={profiles} loading={loading}></Header>
        {!loading && (
          <>
            <Menu
              pages={[
                ...pages.current,
                { name: 'Blog', url: portfolio.basics.blog },
              ]}
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
