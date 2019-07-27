import React from 'react';

import {incrementCount} from '../../store/counter/actions';
import {CounterState} from '../../store/counter/types';
import './style.css';
import Player from '../Player'


interface AppProps {
  incrementCount: typeof incrementCount;
  counter: CounterState;
}

class App extends React.Component<AppProps> {

  increment = () => {
    this.props.incrementCount();
  };

  render() {
    return (
      <div>
        <Player/>
      </div>
    );
  }
}

export default App;
