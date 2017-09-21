import React from 'react';
import PropTypes from 'prop-types';
import SplitPane from '@kadira/react-split-pane';
import SystemMonitor from '../../containers/SystemMonitor.js';
import SystemViewer from '../../containers/SystemViewer.js';

class ControlPanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      components: ['System Monitor' , 'SystemViewer'],
      split: 'vertical'
    };
  }

  render () {
    let content = this.props.content;

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
      content.length == 1 ?
      <div style={{border: '2px solid red'}}>
        <button onClick={() => this.props.addPane(this.props.index)}>+</button>
        <button onClick={() => this.props.closePane(this.props.index)}>x</button>
        {setContent(content[0])}
      </div>
      :
      <div style={{border: '4px solid green', width: '100%', height: '100%'}}>
        <SplitPane split={this.props.split}>
          {content.map((c, i) =>
            <ControlPanel
              key={c}
              addPane={this.props.addPane}
              closePane={this.props.closePane}
              content={c}
              split={this.state.split}
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
  closePane: PropTypes.func.isRequired
};

export default ControlPanel;
