/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import SplitPane from '@kadira/react-split-pane';
import ControlPanel from './ControlPanel.js';
import SystemViewer from './SystemViewer.js';
import SystemViewerModal from './SystemViewerModal.js';
import SystemMonitor from './SystemMonitor.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as uiActions from '../actions/uiActions.js';
import * as activeSceneActions from '../actions/activeSceneActions.js';
import '../App.scss';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      top: {
        split: 'vertical',
        a: 'System Monitor',
        b: 'System Viewer'
      },
      bottom: {
        split: 'horizontal',
        a: 'System Viewer',
        b: 'System Monitor'
      }
    };
  }

  componentDidMount () {
    const {scenes, setActiveScene} = this.props;
    setTimeout(() => setActiveScene(R.head(scenes)), 1000);
  }

  render() {
    let {resizePane} = this.props;
    let {top, bottom} = this.state;

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
                <div className="ContentPanel top">
                  <div className="Content">
                    <div className="Content__Header">
                      {top.a}
                      <div className="field has-addons is-pulled-right">
                        <div className="control">
                          <a className="button is-small">
                            <span className="icon is-small">
                              <i className="fa fa-github"></i>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                    {setContent(top.a)}
                  </div>
                </div>
                <div className={"ContentPanel" + (top.split == 'vertical' ? ' top' : '')}>
                  <div className="Content">
                    {setContent(top.b)}
                  </div>
                </div>
              </SplitPane>
              :
              <div className="ContentPanel top">
                <div className="Content">
                  <SystemMonitor />
                </div>
              </div>
            }
            {
              bottom.split ?
              <SplitPane split={bottom.split} onDragFinished={resizePane}>
                <div className="ContentPanel">
                  <div className="Content">
                    {setContent(bottom.a)}
                  </div>
                </div>
                <div className="ContentPanel">
                  <div className="Content">
                    {setContent(bottom.b)}
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

const mapStateToProps = R.pick(['scenes', 'activeScene']);
const mapDispatchToProps = (dispatch) => bindActionCreators(R.merge(activeSceneActions, uiActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
