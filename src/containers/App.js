/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import SplitPane from '@kadira/react-split-pane';
import ControlPanel from '../components/ControlPanel.js';
import SystemViewer from '../components/system-viewer/SystemViewer.js';
import SystemViewerModal from '../components/system-viewer/SystemViewerModal.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import '../App.scss';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
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
    const {scenes, setActiveScene} = this.props;
    setTimeout(() => setActiveScene(R.head(scenes)), 1000);
  }
  setActiveIdx (i) {
  }

  activateScene () {
  }

  deactivateScene () {
  }

  toggleTileActive (i) {
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

  resize () {
    this.setState({resize: !this.state.resize});
  }

  render() {
    let {scenes, activeScene, setActiveScene} = this.props;
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
              setActiveScene={setActiveScene}
              activateScene={this.activateScene}
              deactivateScene={this.deactivateScene}
              handleInput={this.toggleTileActive}
              activeScene={activeScene}/>
          </div>

          <SplitPane split="horizontal" primary="second" defaultSize={200} onDragFinished={this.resize}>
            <div className="ContentPanel top">
              <div className="Content">
                <SystemViewer scenes={scenes} activeScene={activeScene}
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

App.propTypes = {
  scenes: PropTypes.array.isRequired,
  activeScene: PropTypes.object,
  setActiveScene: PropTypes.func.isRequired
};

const mapStateToProps = R.pick(['scenes', 'activeScene']);
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
