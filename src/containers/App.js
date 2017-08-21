/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import SplitPane from '@kadira/react-split-pane';
import ControlPanel from './ControlPanel.js';
import SystemViewer from './SystemViewer.js';
import SystemViewerModal from '../components/system-viewer/SystemViewerModal.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as uiActions from '../actions/uiActions.js';
import * as activeSceneActions from '../actions/activeSceneActions.js';
import '../App.scss';

class App extends Component {
  componentDidMount () {
    const {scenes, setActiveScene} = this.props;
    setTimeout(() => setActiveScene(R.head(scenes)), 1000);
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
    let {resizePane} = this.props;
    return (
      <div className="App">
        <SystemViewerModal />

        <SplitPane split="vertical" defaultSize={200} onDragFinished={resizePane}>

          <div className="SidePanel">
            <ControlPanel />
          </div>

          <SplitPane split="horizontal" primary="second" defaultSize={200} onDragFinished={resizePane}>
            <div className="ContentPanel top">
              <div className="Content">
                <SystemViewer />
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
  setActiveScene: PropTypes.func.isRequired,
  sceneTogglePower: PropTypes.func.isRequired,
  resizePane: PropTypes.func.isRequired
};

const mapStateToProps = R.pick(['scenes', 'activeScene']);
const mapDispatchToProps = (dispatch) => bindActionCreators(R.merge(activeSceneActions, uiActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
