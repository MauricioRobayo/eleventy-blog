import React from "react";
import styles from "./App.module.css";
import Header from "./components/Header";
import Menu from "./components/Menu"
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/footer";
import { Portfolio, Page } from "./types";

interface State {
  portfolio: Portfolio;
  isLoading: Boolean;
  pages: Page[];
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isLoading: true,
      portfolio: {
        basics: {
          name: "Mauricio Robayo",
          website: "https://www.mauriciorobayo.com",
        },
      },
      pages: [
        {
          name: "About",
          selected: true,
          url: "",
        },
        {
          name: "Projects",
          selected: false,
          url: "",
        },
        {
          name: "Contact",
          selected: false,
          url: "",
        },
        {
          name: "Blog",
          selected: false,
          url: "https://blog.mauriciorobayo.com",
        }
      ]
    };
  }

  componentDidMount() {
    fetch("https://gitconnected.com/v1/portfolio/mauriciorobayo")
      .then((response) => response.json())
      .then((json) =>
        this.setState({
          isLoading: false,
          portfolio: json,
        })
      );
  }

  render() {
    const { portfolio: {basics: { name, website, email, summary, headline, profiles }, projects }, isLoading } = this.state;
    if (isLoading) {
      return (<div className={styles.loading}>
       <Header website={website} name={name} isLoading></Header>
      </div>)
    }
    return (
      <div className={styles.loaded}>
        <Header website={website} name={name} profiles={profiles}></Header>
        <Menu pages={this.state.pages}></Menu>
        <About summary={summary} headline={headline}></About>
        <Projects projects={projects}></Projects>
        <Contact email={email} profiles={profiles}></Contact>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
