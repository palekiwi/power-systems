/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SplitPane from '@kadira/react-split-pane';
import ContentPanel from '../components/ui/ContentPanel.js';
import ControlPanel from './ControlPanel.js';
import SystemViewer from './SystemViewer.js';
import SystemViewerModal from './SystemViewerModal.js';
import SystemMonitor from './SystemMonitor.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as uiActions from '../actions/uiActions.js';
import * as activeSceneActions from '../actions/activeSceneActions.js';
import '../App.scss';
import assocPath from 'ramda/src/assocPath';
import path from 'ramda/src/path';
import head from 'ramda/src/head';
import pick from 'ramda/src/pick';
import merge from 'ramda/src/merge';
import remove from 'ramda/src/remove';
import append from 'ramda/src/append';
import lensPath from 'ramda/src/lensPath';
import over from 'ramda/src/over';
import set from 'ramda/src/set';
import last from 'ramda/src/last';
import init from 'ramda/src/init';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      content: [
        [
          ['System Monitor'],
          ['System Viz']
        ],
        [
          'System Graph'
        ],
      ]
    };

    this.setContent = this.setContent.bind(this);
    this.closePane = this.closePane.bind(this);
    this.addPane = this.addPane.bind(this);
  }

  componentDidMount () {
    const {scenes, setActiveScene} = this.props;
    setTimeout(() => setActiveScene(head(scenes)), 1000);
  }

  setContent (idx, content) {
    this.setState({content: set(lensPath(treePath(idx)), [content], this.state.content)});
  }

  closePane (idx) {
    let path = treePath(idx);
    let i = last(path);
    let p = init(path);
    let res = over(lensPath(p), a => (i == 0) ? a[1] : a[0], this.state.content);
    this.setState({content: res});
  }

  addPane (idx) {
    this.setState({content: over(lensPath(treePath(idx)), a => [a, ['']], this.state.content)});
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

            <div className="Container">
              <ContentPanel
                addPane={this.addPane}
                closePane={this.closePane}
                split="vertical"
                setContent={this.setContent}
                resizePane={this.props.resizePane}
                content={this.state.content}
                index={0}
              />
            </div>
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

const mapStateToProps = pick(['scenes', 'activeScene']);
const mapDispatchToProps = (dispatch) => bindActionCreators(merge(activeSceneActions, uiActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);

function treePath (n) {
  return n == 0 ? [] : append((n - 1) % 2, treePath(Math.floor((n -1) / 2)));
}
