/* eslint-disable no-console */
import React, { Component } from 'react';
import R from 'ramda';
import SplitPane from '@kadira/react-split-pane';
import ControlPanel from './components/ControlPanel.js';
import SystemViewer from './components/system-viewer/SystemViewer.js';
import SystemViewerModal from './components/system-viewer/SystemViewerModal.js';
import scenes from './data/scenes';
import './App.scss';

// lens that focuses on the active field of data object inside a strtucture tile
const activeLens = activeIdx => compIdx => R.compose(
  R.lensIndex(activeIdx),
  R.lensPath(['structureTiles']),
  R.lensIndex(compIdx),
  R.lensPath(['data', 'active'])
);

// operation that sets the value of active field in the data object of an array of objects
const mapActive = R.compose(
  R.map,
  R.assocPath(['data', 'active'])
);

// update operation of all structure tile objects of a scene
const toggleSceneActiveState = state => R.adjust(
  R.over(R.lensPath(['structureTiles']), mapActive(state))
);

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      scenes: scenes,
      activeIdx: null,
      showSystemViewerModal: false,
      systemViewerModalContent: null,
      systemViewerModalPosition:[0, 0],
      resize: false
    };

    this.setActiveIdx = this.setActiveIdx.bind(this);
    this.openSystemViewerModal = this.openSystemViewerModal.bind(this);
    this.closeSystemViewerModal = this.closeSystemViewerModal.bind(this);
    this.activateScene = this.activateScene.bind(this);
    this.deactivateScene = this.deactivateScene.bind(this);
    this.toggleTileActive = this.toggleTileActive.bind(this);
    this.resize = this.resize.bind(this);
  }

  componentDidMount () {
    setTimeout(() => this.setActiveIdx(0), 1000);
  }
  setActiveIdx (i) {
    this.setState({activeIdx: i});
  }

  activateScene () {
    let scenes = toggleSceneActiveState(true)(this.state.activeIdx)(this.state.scenes);
    this.setState({scenes});
  }

  deactivateScene () {
    let scenes = toggleSceneActiveState(false)(this.state.activeIdx)(this.state.scenes);
    this.setState({scenes});
  }

  toggleTileActive (i) {
    const active = activeLens(this.state.activeIdx)(i);
    const val = R.not(R.view(active)(this.state.scenes));
    const scenes = R.set(active, val)(this.state.scenes);
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

  resize () {
    this.setState({resize: !this.state.resize});
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

        <SplitPane split="vertical" defaultSize={200} onDragFinished={this.resize}>

          <div className="SidePanel">
            <ControlPanel scenes={scenes}
              setActiveIdx={this.setActiveIdx}
              activateScene={this.activateScene}
              deactivateScene={this.deactivateScene}
              handleInput={this.toggleTileActive}
              activeIdx={activeIdx}/>
          </div>

          <SplitPane split="horizontal" primary="second" defaultSize={200} onDragFinished={this.resize}>
            <div className="ContentPanel top">
              <div className="Content">
                <SystemViewer scenes={scenes}activeIdx={activeIdx}
                  activateScene={this.activateScene}
                  deactivateScene={this.deactivateScene}
                  resize={this.state.resize}
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
