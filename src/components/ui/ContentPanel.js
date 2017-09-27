import React from 'react';
import PropTypes from 'prop-types';
import SplitPane from '@kadira/react-split-pane';
import SystemMonitor from '../../containers/SystemMonitor.js';
import SystemSettings from '../../containers/SystemSettings.js';
import SystemData from '../../containers/SystemData.js';
import SystemViz from '../../containers/SystemViz.js';
import SystemGraph from '../../containers/SystemGraph.js';
import BatteryGraph from '../../containers/BatteryGraph.js';

class ContentPanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      split: 'horizontal',
      dropdown: false
    };

    this.setSplit = this.setSplit.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentDidMount () {
    this.props.defaultSplit && this.setState({split: this.props.defaultSplit});
  }

  setSplit () {
    let s = this.state.split == 'horizontal' ? 'vertical' : 'horizontal';
    this.setState({split: s});
    this.props.resizePane();
  }

  toggleDropdown () {
    this.setState({dropdown: !this.state.dropdown});
  }

  handleItemClick (idx, x) {
    this.setState({dropdown: false});
    this.props.setContent(idx, x);
  }

  render () {
    let content = this.props.content;

    const setComponent = (content) => {
      switch (content) {

      case 'System Monitor':
        return <SystemMonitor/>;

      case 'System Settings':
        return <SystemSettings/>;

      case 'System Data':
        return <SystemData/>;

      case 'Graphic':
        return <SystemViz/>;

      case 'System Chart':
        return <SystemGraph/>;

      case 'Battery Chart':
        return <BatteryGraph/>;

      default:
        <div>Nothing</div>;
      }
    };

    let x = content[0];
    let xs = ['Graphic', 'System Chart', 'Battery Chart', 'System Data', 'System Settings'];
    let icons = {
      'Graphic': 'picture-o',
      'System Chart': 'area-chart',
      'Battery Chart': 'battery-three-quarters',
      'System Data': 'tachometer',
      'System Settings': 'sliders'
    };

    return (
      content.length == 1 ?
      <div className="ContentPanel">

        <div className="ContentPanel__Header">

          <div className={"dropdown" + (this.state.dropdown ? ' is-active': '')}>
            <div className="dropdown-trigger">
              <button className="button is-small"
                onClick={this.toggleDropdown}
              >
                <span className="panel-icon is-small">
                  <i className={"fa fa-" + icons[x]}></i>
                </span>
                <span>{x}</span>
                <span className="icon is-small">
                  <i className="fa fa-angle-down"></i>
                </span>
              </button>
            </div>
            <div className="dropdown-menu">
              <div className="dropdown-content">
                {xs.map((x, i) =>
                  <a className="dropdown-item"
                    key={i}
                    onClick={() => this.handleItemClick(this.props.index, x)}
                  >
                    <span className="panel-icon is-small">
                      <i className={"fa fa-" + icons[x]}></i>
                    </span>
                    <span>{x}</span>
                  </a>
                  )}
              </div>
            </div>
          </div>

          <div className="ContentPanel__Controls field has-addons is-pulled-right">
            <p className="control">
              <a className="button is-small" onClick={() => this.props.addPane(this.props.index)}>
                <span className="icon is-small">
                  <i className="fa fa-plus"></i>
                </span>
              </a>
            </p>
            {this.props.index > 0 &&
              <p className="control">
                <a className="button is-small" onClick={() => this.props.closePane(this.props.index)}>
                  <span className="icon is-small">
                    <i className="fa fa-times"></i>
                  </span>
                </a>
              </p>
            }
            {this.props.index > 0 &&
              <p className="control">
                <a className="button is-small" onClick={this.props.setSplit}>
                  <span className="icon is-small">
                    <i className="fa fa-pause" style={{transform: `rotate(${this.props.split == 'vertical' ? '90' : '0'}deg)`}}></i>
                  </span>
                </a>
              </p>
            }
          </div>
        </div>

        <div className="ContentPanel__Body">
          {setComponent(content[0])}
        </div>
      </div>
      :
      <div>
        <SplitPane split={this.state.split} onDragFinished={this.props.resizePane}>
          {content.map((c, i) =>
            <ContentPanel
              key={c}
              addPane={this.props.addPane}
              closePane={this.props.closePane}
              setContent={this.props.setContent}
              resizePane={this.props.resizePane}
              setSplit={this.setSplit}
              split={this.state.split}
              content={c}
              index={this.props.index * 2 + 1 + i}/>
          )}
        </SplitPane>
      </div>
    );
  }
}

ContentPanel.propTypes = {
  content: PropTypes.array.isRequired,
  split: PropTypes.string,
  defaultSplit: PropTypes.string,
  index: PropTypes.number.isRequired,
  addPane: PropTypes.func.isRequired,
  closePane: PropTypes.func.isRequired,
  setContent: PropTypes.func.isRequired,
  setSplit: PropTypes.func,
  resizePane: PropTypes.func.isRequired
};

export default ContentPanel;
