/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import isometricGrid from '../../lib/isometric-grid.js';
import MainCanvass from './MainCanvass.js';
import './SceneTwoD.scss';

class SceneTwoD extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      grid: isometricGrid({})
    };
  }
  componentDidMount () {
    let width = this.scene.offsetWidth;
    let height = this.scene.offsetHeight;
    let grid = isometricGrid({width, height, gridSize: this.props.gridSize});
    this.setState({width, height, grid});

  }

  render () {
    return (
      <div className="SceneTwoD" ref={c => this.scene = c}>
        <div className="MainCanvass">
          <MainCanvass {...this.state} {...this.props}/>
        </div>
        <div className="Grid">
        </div>
        <div className="Network">
        </div>
        <div className="Markers">
        </div>
      </div>
    );
  }
}

SceneTwoD.propTypes = {
  gridSize: PropTypes.array.isRequired,
  system: PropTypes.object.isRequired,
  terrainTiles: PropTypes.array.isRequired,
  structureTiles: PropTypes.array.isRequired,
};

export default SceneTwoD;
