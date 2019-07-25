import React from 'react';

import { incrementCount } from '../../store/counter/actions';
import { CounterState } from '../../store/counter/types';

import logo from './logo.svg';
import './style.css';


interface AppProps {
  incrementCount: typeof incrementCount;
  counter: CounterState;
}

class App extends React.Component<AppProps> {

  increment = () => {
    this.props.incrementCount();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.<br/>
            You have clicked <a onClick={this.increment}>here</a> for {this.props.counter.count} times.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
