import React from 'react';
import PropTypes from 'prop-types';
import SplitPane from '@kadira/react-split-pane';
import SystemMonitor from '../../containers/SystemMonitor.js';
import SystemViz from '../../containers/SystemViz.js';
import SystemGraph from '../../containers/SystemGraph.js';
import BatteryGraph from '../../containers/BatteryGraph.js';

class ControlPanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      components: ['System Monitor' , 'SystemViewer'],
      split: 'horizontal',
      dropdown: false
    };

    this.setSplit = this.setSplit.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  setSplit (s) {
    this.setState({split: s});
  }

  toggleDropdown () {
    this.setState({dropdown: !this.state.dropdown});
  }

  render () {
    let content = this.props.content;

    const setComponent = (content) => {
      switch (content) {

      case 'System Monitor':
        return <SystemMonitor/>;

      case 'System Viz':
        return <SystemViz/>;

      case 'System Graph':
        return <SystemGraph/>;

      case 'Battery Graph':
        return <BatteryGraph/>;

      default:
        <div>Nothing</div>;
      }
    };

    return (
      content.length == 1 ?
      <div className="ContentPanel">
        <div className="ContentPanel__Header">
          <button onClick={() => this.props.addPane(this.props.index)}>+</button>
          {
            this.props.index > 0 && <button onClick={() => this.props.closePane(this.props.index)}>x</button>
          }
          <button onClick={this.toggleDropdown}>{this.state.dropdown ? 'on' : 'off'}</button>
          <button onClick={() => this.props.setContent(this.props.index, 'System Monitor')}>Monitor</button>
          <button onClick={() => this.props.setContent(this.props.index, 'System Viz')}>Viz</button>
          <button onClick={() => this.props.setContent(this.props.index, 'System Graph')}>System</button>
          <button onClick={() => this.props.setContent(this.props.index, 'Battery Graph')}>Battery</button>
        </div>
        <div className="ContentPanel__Body">
          {setComponent(content[0])}
        </div>
      </div>
      :
      <div>
        <SplitPane split={this.props.split || this.state.split} onDragFinished={this.props.resizePane}>
          {content.map((c, i) =>
            <ControlPanel
              key={c}
              addPane={this.props.addPane}
              closePane={this.props.closePane}
              setContent={this.props.setContent}
              resizePane={this.props.resizePane}
              content={c}
              index={this.props.index * 2 + 1 + i}/>
          )}
        </SplitPane>
      </div>
    );
  }
}

ControlPanel.propTypes = {
  content: PropTypes.array.isRequired,
  split: PropTypes.string,
  index: PropTypes.number.isRequired,
  addPane: PropTypes.func.isRequired,
  closePane: PropTypes.func.isRequired,
  setContent: PropTypes.func.isRequired,
  resizePane: PropTypes.func.isRequired
};

export default ControlPanel;
