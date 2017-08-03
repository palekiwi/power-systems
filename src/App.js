/* eslint-disable no-console */
import React, { Component } from 'react';
import SplitPane from '@kadira/react-split-pane';
import ControlPanel from './components/ControlPanel.js';
import SystemViewer from './components/system-viewer/SystemViewer.js';
import SystemViewerModal from './components/system-viewer/SystemViewerModal.js';
import { fushanMicrogrid, qimeiMicrogrid } from './data/power-systems.js';
import { fushan, qimei } from './data/cases-2d.js';
import './App.scss';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      scenes:[fushan, qimei],
      systems: [fushanMicrogrid, qimeiMicrogrid],
      activeIdx: null,
      showSystemViewerModal: false,
      systemViewerModalContent: null,
      systemViewerModalPosition:[0, 0]
    };

    this.setActiveIdx = this.setActiveIdx.bind(this);
    this.openSystemViewerModal = this.openSystemViewerModal.bind(this);
    this.closeSystemViewerModal = this.closeSystemViewerModal.bind(this);
  }

  componentDidMount () {
    setTimeout(() => this.setActiveIdx(0), 1000);
  }
  setActiveIdx (i) {
    this.setState({activeIdx: i});
  }

  openSystemViewerModal (e, tile) {
    let {left, top} = e.target.getBoundingClientRect();
    this.setState({
      showSystemViewerModal: true,
      systemViewerModalContent: tile,
      systemViewerModalPosition: [left, top]
    });
  }

  closeSystemViewerModal () {
    this.setState({
      showSystemViewerModal: false,
      systemViewerModalContent: null
    });
  }

  render() {
    let {scenes, activeIdx} = this.state;
    return (
      <div className="App">
        <SystemViewerModal data={this.state.systemViewerModalContent}
          showModal={this.state.showSystemViewerModal}
          position={this.state.systemViewerModalPosition}
          closeModal={this.closeSystemViewerModal}/>

        <SplitPane split="vertical" defaultSize={200}>

          <div className="SidePanel">
            <ControlPanel scenes={scenes}
              setActiveIdx={this.setActiveIdx}
              activeIdx={activeIdx}/>
          </div>

          <SplitPane split="horizontal" primary="second" defaultSize={200}>
            <div className="ContentPanel top">
              <div className="Content">
                <SystemViewer scenes={scenes}activeIdx={activeIdx}
                  openSystemViewerModal={this.openSystemViewerModal}/>
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
