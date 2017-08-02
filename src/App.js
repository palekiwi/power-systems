/* eslint-disable no-console */
import React, { Component } from 'react';
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
      <div className="microgrid-app">
        <div className="split-pane-vertical">

          <div className="pane-vertical panel">
            <div className="split-pane-horizontal">
              <div className="controls">
                <div className="panel-horizontal">
                </div>
              </div>
              <hr />

              <div className="controls">
                <div className="panel-horizontal">
                </div>
              </div>
            </div>
          </div>

          <div className="pane-vertical pane2">
            <div className="split-pane-horizontal">

              <div className="pane-horizontal">
                <div className="horizontal-panel">
                  <div className="horizontal-panel-content">
                  </div>
                </div>
              </div>

              <div className="pane-horizontal bottom">
                <div className="horizontal-panel">
                  <div className="horizontal-panel-content">
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
