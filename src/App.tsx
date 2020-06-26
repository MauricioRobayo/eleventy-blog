import React from 'react';
import styles from './App.module.css';
import Header from './components/Header';
import Menu from './components/Menu';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/footer';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Portfolio as PortfolioType, Page, PageName } from './types';
import Portfolio from './portfolio';

interface State {
  portfolio: PortfolioType;
  isLoading: Boolean;
  activePage: Page;
}

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

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isLoading: true,
      portfolio: {
        basics: {
          name: 'Mauricio Robayo',
        },
      },
      activePage: pages[0],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const portfolio = new Portfolio(60);
    portfolio.getPortfolio().then((portfolio) =>
      this.setState({
        isLoading: false,
        portfolio,
      })
    );
  }

  handleClick(pageName: PageName): void {
    this.setState({
      activePage: pages.find(({ name }) => name === pageName) as Page,
    });
  }

  render() {
    const {
      portfolio: {
        basics: { name, website, email, summary, headline, profiles },
        projects,
      },
      isLoading,
    } = this.state;

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
                activePage={this.state.activePage}
                onClick={this.handleClick}
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
  }
}

export default App;
