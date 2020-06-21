import React from "react";
import "./App.css";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact"
import { Portfolio } from "./types";

interface State {
  portfolio: Portfolio;
  isLoading: Boolean;
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
    const { portfolio: {basics, projects }, isLoading } = this.state;
    if (isLoading) {
      return <Header basics={basics} isLoading></Header>
    }
    return (
      <div className="App">
        <Header basics={basics}></Header>
        <About {...basics}></About>
        <Projects projects={projects}></Projects>
        <Contact {...basics}></Contact>
      </div>
    );
  }
}

export default App;
