import React from 'react';
import {Button, List, Picker, Stepper, WhiteSpace, WingBlank} from 'antd-mobile';
import {updateDuration, selectTonic, selectTonality} from '../../store/player/actions';
import {PlayerState} from "../../store/player/types";
import './style.css';
import {AudioSynth} from "../../audio/AudioSynth";

interface PlayerProps {
  updateDuration: typeof updateDuration,
  selectTonic: typeof selectTonic,
  selectTonality: typeof selectTonality,
  player: PlayerState
}

const tonalityData = [
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

const tonicData = AudioSynth._notes.map((label: string, index: number) => {
  return {label: label, value: index}
});

export class Player extends React.Component<PlayerProps> {


  updateDuration = (duration: number) => {
    this.props.updateDuration(duration);
  };

  selectTonality = (tonality: number[]) => {
    this.props.selectTonality(tonality[0]);
  };

  selectTonic = (tonic: number[]) => {
    this.props.selectTonic(tonic[0]);
  };

  render() {
    return (
      <div className="Player">
        <List className="picker-list">

          <Picker data={tonalityData}
                  value={[this.props.player.tonality]}
                  onOk={this.selectTonality}
                  cols={1} className="forss">
            <List.Item arrow="horizontal">Tonality</List.Item>
          </Picker>
          <Picker data={tonicData}
                  value={[this.props.player.tonic]}
                  onOk={this.selectTonic}
                  cols={1} className="forss">
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
        <WhiteSpace/>
        <WingBlank>
          <Button type="primary">Play</Button>
        </WingBlank>
      </div>
    );
  }
}
