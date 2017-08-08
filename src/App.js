/* eslint-disable no-console */
import React, { Component } from 'react';
import R from 'ramda';
import SplitPane from '@kadira/react-split-pane';
import ControlPanel from './components/ControlPanel.js';
import SystemViewer from './components/system-viewer/SystemViewer.js';
import SystemViewerModal from './components/system-viewer/SystemViewerModal.js';
import { fushanMicrogrid, qimeiMicrogrid } from './data/power-systems.js';
import { fushan, qimei } from './data/cases-2d.js';
import './App.scss';

const activeLens = activeIdx => compIdx => R.compose(
  R.lensIndex(activeIdx),
  R.lensPath(['structureTiles']),
  R.lensIndex(compIdx),
  R.lensPath(['data', 'active'])
);

const mapActive = R.compose(
  R.map,
  R.assocPath(['data', 'active'])
);

const toggleSceneActiveState = state => R.adjust(
  R.over(R.lensPath(['structureTiles']), mapActive(state))
);

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
    this.toggleActivateScene = this.toggleActivateScene.bind(this);
  }

  componentDidMount () {
    setTimeout(() => this.setActiveIdx(0), 1000);
  }
  setActiveIdx (i) {
    this.setState({activeIdx: i});
  }

  toggleActivateScene () {
    let scenes = toggleSceneActiveState(true)(0)(this.state.scenes);
    this.setState({scenes});
  }

  openSystemViewerModal (e, tile) {
    let {left, top} = e.target.getBoundingClientRect();
    this.setState({
      showSystemViewerModal: true,
      systemViewerModalContent: this.state.systems[this.state.activeIdx].components.find(el => el.name = tile.data.name),
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
          content={this.state.systemViewerModalContent}
          closeModal={this.closeSystemViewerModal}/>

        <SplitPane split="vertical" defaultSize={200}>

          <div className="SidePanel">
            <ControlPanel scenes={scenes}
              setActiveIdx={this.setActiveIdx}
              toggleActivateScene={this.toggleActivateScene}
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
