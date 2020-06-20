import React from "react";
import "./App.css";
import Header from "./components/Header";
import About from "./components/About";
import { Basics } from "./types";

interface Portfolio {
  basics: Basics;
}

interface State {
  profile: Portfolio;
  isLoading: Boolean;
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isLoading: true,
      profile: {
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
          profile: json,
        })
      );
  }

  render() {
    const { profile: basics, isLoading } = this.state;
    return (
      <div className="App">
        <Header {...basics} isLoading={isLoading}></Header>
        <About {...basics} isLoading={isLoading}></About>
      </div>
    );
  }
}

export default App;
