import React from 'react';
import './App.css';

interface Props {
}

interface State {
  basics:  Basics
}

interface Basics {
  name: string;
  website: string;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
        basics: {
          name: "Mauricio Robayo",
          website: "https://www.mauriciorobayo.com"
        }
    };
  }

  render() {
    return (<div className="App">
      <header className="App-header">
  <h1><a href={this.state.basics.website}>{this.state.basics.name}</a></h1>
      </header>
    </div>)
  }
}

export default App;
