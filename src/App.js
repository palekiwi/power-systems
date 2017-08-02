/* eslint-disable no-console */
import React, { Component } from 'react';
import SplitPane from '@kadira/react-split-pane';
import ControlPanel from './components/ControlPanel.js';
import Graphic from './components/graphic/Graphic.js';
import { fushanMicrogrid, qimeiMicrogrid } from './data/power-systems.js';
import { fushan, qimei } from './data/cases-2d.js';
import './App.scss';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      cases:[fushan, qimei],
      systems: [fushanMicrogrid, qimeiMicrogrid],
      activeIdx: 0
    };

    this.setActiveIdx = this.setActiveIdx.bind(this);
  }

  setActiveIdx (i) {
    this.setState({activeIdx: i});
  }

  render() {
    let {cases, activeIdx, system} = this.state;
    return (
      <div className="App">
        <SplitPane split="vertical" minSize={50} defaultSize={250}>

          <div className="SidePanel">
            <ControlPanel cases={cases}
              setActiveIdx={this.setActiveIdx}
              activeIdx={activeIdx}/>
          </div>

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
