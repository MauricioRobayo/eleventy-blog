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
import { Page, PageName } from './types';
import { usePorfolioApi } from './utils/usePorfolioApi';

interface Props {
  apiUrl: string;
}

const App: FunctionComponent<Props> = ({ apiUrl }: Props) => {
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

  const [activePage, setActivePage] = useState(pages.current[0]);
  const { portfolio, error } = usePorfolioApi(apiUrl);

  const handleClick = (pageName: PageName): void => {
    setActivePage(pages.current.find(({ name }) => name === pageName) as Page);
  };

  if (error) {
    return <Error message={error} url={apiUrl}></Error>;
  }

  return (
    <HashRouter>
      <div
        className={`${styles.app} ${
          portfolio ? styles.loaded : styles.loading
        }`}
      >
        {!portfolio ? (
          <Header title="Mauricio Robayo" loading={true}></Header>
        ) : (
          <>
            <Header
              title={portfolio.owner.name}
              profiles={portfolio.owner.profiles}
            ></Header>
            <Menu
              pages={[
                ...pages.current,
                { name: 'Blog', url: portfolio.owner.blog },
              ]}
              activePage={activePage}
              onClick={handleClick}
            ></Menu>
            <Switch>
              <Route path="/about">
                <About
                  summary={portfolio.owner.summary}
                  headline={portfolio.owner.headline}
                ></About>
              </Route>
              <Route path="/projects">
                <Projects projects={portfolio.projects}></Projects>
              </Route>
              <Route path="/contact">
                <Contact
                  email={portfolio.owner.email}
                  profiles={portfolio.owner.profiles}
                ></Contact>
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
