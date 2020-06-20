import React from "react";
import "./App.css";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
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
    return (
      <div className="App">
        <Header basics={basics} isLoading={isLoading}></Header>
        <About {...basics}></About>
        {projects && <Projects projects={projects}></Projects>}
      </div>
    );
  }
}

export default App;
