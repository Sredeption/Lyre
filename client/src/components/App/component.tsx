import React from 'react';

import {incrementCount} from '../../store/counter/actions';
import {CounterState} from '../../store/counter/types';
import './style.css';
import Player from '../Player'
import {Icon, NavBar} from "antd-mobile";


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
        <NavBar
          mode="dark"
          leftContent="Back"
          rightContent={[
            <Icon key="1" type="ellipsis"/>,
          ]}
        >
          NavBar
        </NavBar>
        <Player/>
      </div>
    );
  }
}

export default App;
