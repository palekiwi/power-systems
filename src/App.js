/* eslint-disable no-console */
import React, { Component } from 'react';
import SplitPane from '@kadira/react-split-pane';
import Graphic from './components/graphic/Graphic.js';
import { fushanMicrogrid } from './data/power-systems.js';
import { fushan } from './data/cases-2d.js';
import './App.scss';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      cases2d:[fushan],
      systems: [fushanMicrogrid],
      activeIdx: 0
    };
  }

  render() {
    return (
      <div className="App">
        <SplitPane split="vertical" minSize={50} defaultSize={250}>

          <div className="SidePanel"></div>

          <SplitPane split="horizontal" defaultSize={200} primary="second">
            <div className="ContentPanel top">
              <div className="Content"></div>
            </div>
            <div className="ContentPanel bottom">
              <div className="Content"></div>
            </div>
          </SplitPane>
        </SplitPane>
      </div>
    );
  }
}

export default App;
