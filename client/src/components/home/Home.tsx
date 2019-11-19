import React from 'react';
import {Button, List, Picker, Progress, Stepper, WhiteSpace, WingBlank} from 'antd-mobile';
import {play, selectTonality, selectTonic, stop, updateDuration, updateVolume} from '../../store/player/Actions';
import {PlayerState} from "../../store/player/Types";
import './Style.css';
import {AudioSynth} from "../../audio/AudioSynth";

interface HomeProps {
  updateDuration: typeof updateDuration,
  selectTonic: typeof selectTonic,
  selectTonality: typeof selectTonality,
  updateVolume: typeof updateVolume,
  play: typeof play,
  stop: typeof stop,
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

export class Home extends React.Component<HomeProps> {


  updateDuration = (duration: number) => {
    this.props.updateDuration(duration);
  };

  selectTonality = (tonality: number[]) => {
    this.props.selectTonality(tonality[0]);
  };

  selectTonic = (tonic: number[]) => {
    this.props.selectTonic(tonic[0]);
  };

  updateVolume = (volume: number) => {
    this.props.updateVolume(volume);
  };

  render() {
    const {player, play, stop} = this.props;

    return (
      <div className="Home">
        <List className="picker-list">

          <Picker data={tonalityData}
                  value={[player.tonality]}
                  onOk={this.selectTonality}
                  cols={1} className="forss"
                  disabled={player.playing}
          >
            <List.Item arrow="horizontal">Tonality</List.Item>
          </Picker>
          <Picker data={tonicData}
                  value={[player.tonic]}
                  onOk={this.selectTonic}
                  cols={1} className="forss"
                  disabled={player.playing}
          >
            <List.Item arrow="horizontal">Tonic</List.Item>
          </Picker>

          <List.Item
            wrap
            extra={
              <Stepper
                showNumber
                max={10}
                min={1}
                value={player.duration}
                onChange={this.updateDuration}
                disabled={player.playing}
              />}
          >
            Duration
          </List.Item>

          <List.Item
            wrap
            extra={
              <Stepper
                showNumber
                max={1}
                min={0}
                step={0.1}
                value={player.volume}
                onChange={this.updateVolume}
                disabled={player.playing}
              />}
          >
            Volume
          </List.Item>
        </List>
        <WhiteSpace/>
        <WingBlank>
          <Progress percent={player.playIndex * 100 / player.notes.length} position="normal" unfilled={false}
                    appearTransition/>
          <WhiteSpace/>
          {
            player.playing ?
              <Button type="warning" onClick={stop}>Stop</Button>
              :
              <Button type="primary" onClick={play}>Play</Button>
          }
        </WingBlank>
      </div>
    );
  }
}
