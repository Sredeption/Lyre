import React from 'react';
import {Icon, List, NavBar, Picker, Stepper} from 'antd-mobile';
import {updateDuration} from '../../store/player/actions';
import {PlayerState} from "../../store/player/types";
import './style.css';

interface PlayerProps {
  updateDuration: typeof updateDuration,
  player: PlayerState
}

export class Player extends React.Component<PlayerProps> {


  tonalities = [
    {
      label: 'Major',
      value: 1
    },
    {
      label: 'Harmonic Minor',
      value: 2
    },
    {
      label: 'Melodic Minor',
      value: 3
    }
  ];

  updateDuration = (duration: number) => {
    this.props.updateDuration(duration);
  };

  render() {
    return (
      <div className="Player">
        <NavBar
          mode="dark"
          leftContent="Back"
          rightContent={[
            <Icon key="1" type="ellipsis"/>,
          ]}
        >NavBar
        </NavBar>

        <List className="picker-list">

          <Picker data={this.tonalities} cols={1} className="forss">
            <List.Item arrow="horizontal">Tonality</List.Item>
          </Picker>
          <Picker data={this.tonalities} cols={1} className="forss">
            <List.Item arrow="horizontal">Tonic</List.Item>
          </Picker>

          <List.Item
            wrap
            extra={
              <Stepper
                showNumber
                max={10}
                min={1}
                value={this.props.player.duration}
                onChange={this.updateDuration}
              />}
          >
            Duration
          </List.Item>
        </List>
      </div>
    );
  }
}
