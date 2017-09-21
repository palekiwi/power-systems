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
import last from 'ramda/src/last';
import init from 'ramda/src/init';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      content: [
        [
          ['System Monitor'],
          ['System Viewer']
        ],
        [
          ['System Monitor'],
          ['System Viewer']
        ],
      ],
      top: {
        split: null,
        panes: [
          { content: 'System Monitor', dropdown: false }
        ]
      },
      bottom: {
        split: null,
        panes: [
          { content: 'System Monitor', dropdown: false }
        ]
      }
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.setPaneContent = this.setPaneContent.bind(this);
    this.setSplit = this.setSplit.bind(this);
    this.closePane = this.closePane.bind(this);
    this.addPane = this.addPane.bind(this);
  }

  componentDidMount () {
    const {scenes, setActiveScene} = this.props;
    setTimeout(() => setActiveScene(head(scenes)), 1000);
  }

  toggleDropdown (pos, i) {
    let p = [pos, 'panes', i, 'dropdown'];
    let val = path(p, this.state);
    this.setState(assocPath(p, !val, this.state));
  }

  setPaneContent (pos, i, c) {
    this.setState(assocPath([pos, 'panes', i], {content: c, dropdown: false}, this.state));
  }

  setSplit(ns, s) {
    this.setState(assocPath([...ns, 'split'], s, this.state));
  }

  closePane (idx) {
    let path = treePath(idx);
    let i = last(path);
    let p = init(path);
    console.log(p, i);
    let res = over(lensPath(p), a => (i == 0) ? a[1] : a[0], this.state.content);
    console.log(res);
    this.setState({content: res});
    console.log(this.state.content);
  }

  addPane (idx) {
    this.setState({content: over(lensPath(treePath(idx)), a => [a, ['']], this.state.content)});
  }

  render() {
    let {resizePane} = this.props;

    const setContent = (content) => {
      switch (content) {

      case 'System Monitor':
        return <SystemMonitor/>;

      case 'System Viewer':
        return <SystemViewer/>;

      default:
        <div>Nothing</div>;
      }
    };

    return (
      <div className="App">
        <SystemViewerModal />

        <SplitPane split="vertical" defaultSize={200} onDragFinished={resizePane}>

          <div className="SidePanel">
            <ControlPanel />
          </div>

          <ContentPanel
            addPane={this.addPane}
            closePane={this.closePane}
            split="horizontal"
            content={this.state.content}
            index={0}/>
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
