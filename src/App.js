import React, { Component } from 'react';
import TextArea from './TextArea';
import Conduct from './conduct';

import logo from './US08280561-20121002-D00000.png';
import './App.css';

const SCRIPT_TO_LOAD = '/js/speakWorker.js';

const AudioElement = ({src}) => {
  let component = null;

  if (src) {
    component = (
      <audio controls autoPlay src={src}/>
    );
  }

  return component;
}

export default class App extends Component {
  static defaultProps = {
    value: '',
    speakInstance: '',
    audioSrc: ''
  }
  constructor(props) {
    super(props);

    const speakInstance = new Conduct(SCRIPT_TO_LOAD);

    this.state = {speakInstance};
  }

  _handleText(text) {
    this.setState({text});
  }

  _handleWav(wav) {
    let audioSrc = `data:audio/x-wav;base64,${wav}`;

    this.setState({audioSrc});

  }
  _handleSpeak() {
    let {text, speakInstance} = this.state;

    if (text) {
      speakInstance
        .speak({text})
        .then(this._handleWav.bind(this));
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Stephen Hawking said it!</h2>
        </div>
        <TextArea
          placeholder={`write something!`}
          onChange={this._handleText.bind(this)}
          maxLength={140}
        />
        <button onClick={this._handleSpeak.bind(this)}> Tell me things</button>
        <AudioElement src={this.state.audioSrc}/>
      </div>
    );
  }
}
