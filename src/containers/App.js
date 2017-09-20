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

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      components: ['System Monitor', 'System Viewer'],
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

  closePane (pos, i) {
    this.setState(assocPath([pos], {split: null, panes: remove(i, 1, this.state[pos].panes)}, this.state));
  }

  addPane (pos) {
    this.setState(assocPath([pos], {split: 'vertical', panes: [...this.state[pos].panes, {content: null, dropdown: false}]}, this.state));
  }

  render() {
    let {resizePane} = this.props;
    let {components, top, bottom} = this.state;

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

          <SplitPane split="horizontal" defaultSize={200} onDragFinished={resizePane}>
            {
              top.split ?
              <SplitPane split={top.split} onDragFinished={resizePane}>
                {top.panes.map((p, i) =>
                  <ContentPanel
                    item={p}
                    components={components}
                    key={i}
                    index={i}
                    pos="top"
                    split={top.split}
                    toggleDropdown={this.toggleDropdown}
                    setSplit={this.setSplit}
                    setPaneContent={this.setPaneContent}
                    addPane={this.addPane}
                    closePane={this.closePane}
                  >
                    {setContent(p.content)}
                  </ContentPanel>
                )}
              </SplitPane>
              :
              <ContentPanel
                item={top.panes[0]}
                components={components}
                index={0}
                pos="top"
                split={top.split}
                toggleDropdown={this.toggleDropdown}
                setSplit={this.setSplit}
                setPaneContent={this.setPaneContent}
                addPane={this.addPane}
                closePane={this.closePane}
              >
                {setContent(top.panes[0].content)}
              </ContentPanel>
            }
            {
              bottom.split ?
              <SplitPane split={bottom.split} onDragFinished={resizePane}>
                <div className="ContentPanel">
                  <div className="Content">
                    {setContent(bottom.a.content)}
                  </div>
                </div>
                <div className="ContentPanel">
                  <div className="Content">
                    {setContent(bottom.b.content)}
                  </div>
                </div>
              </SplitPane>
              :
              <div className="ContentPanel bottom">
                <div className="Content">
                  <SystemMonitor />
                </div>
              </div>
            }
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

const mapStateToProps = pick(['scenes', 'activeScene']);
const mapDispatchToProps = (dispatch) => bindActionCreators(merge(activeSceneActions, uiActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
