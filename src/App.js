import React, { Component } from 'react';
import TextArea from './TextArea';
import Conduct from './conduct';

//import picture from './hawkings.jpg';
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
          <h2><span>Said by</span> <span className="heading">Stephen Hawking</span></h2>
        </div>
        <div className="Material-form-group">
          <TextArea
            placeholder="write something!"
            value={""}
            onChange={this._handleText.bind(this)}
            maxLength={140}
          />
          <span className="Focus"></span>
          <span className="Bttm-brdr"></span>
        </div>
        <AudioElement src={this.state.audioSrc}/>
        <button className="btn" onClick={this._handleSpeak.bind(this)}> Speak up</button>
        
      </div>
    );
  }
}
