/* eslint-disable no-console */
import React, { Component } from 'react';
import SplitPane from '@kadira/react-split-pane';
import ControlPanel from './components/ControlPanel.js';
import SystemViewer from './components/system-viewer/SystemViewer.js';
import { fushanMicrogrid, qimeiMicrogrid } from './data/power-systems.js';
import { fushan, qimei } from './data/cases-2d.js';
import './App.scss';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      scenes:[fushan, qimei],
      systems: [fushanMicrogrid, qimeiMicrogrid],
      activeIdx: null
    };

    this.setActiveIdx = this.setActiveIdx.bind(this);
  }

  setActiveIdx (i) {
    this.setState({activeIdx: i});
  }

  render() {
    let {scenes, activeIdx} = this.state;
    return (
      <div className="App">
        <SplitPane split="vertical" defaultSize={200}>

          <div className="SidePanel">
            <ControlPanel scenes={scenes}
              setActiveIdx={this.setActiveIdx}
              activeIdx={activeIdx}/>
          </div>

          <SplitPane split="horizontal" primary="second" defaultSize={200}>
            <div className="ContentPanel top">
              <div className="Content">
                <SystemViewer scenes={scenes} activeIdx={activeIdx}/>
              </div>
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
