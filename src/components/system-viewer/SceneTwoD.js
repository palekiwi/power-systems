/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import isometricGrid from '../../lib/isometric-grid.js';
import DomTerrain from './DomTerrain.js';
import DomStructures from './DomStructures.js';
import Grid from './Grid.js';
import Network from './Network.js';
import Markers from './Markers.js';
import { TimelineMax } from 'gsap';
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
    this.props.deactivateScene();
    let width = this.scene.offsetWidth;
    let height = this.scene.offsetHeight;
    let grid = isometricGrid({width, height, gridSize: this.props.gridSize});
    this.setState({width, height, grid});
    this.animateEnter();
  }

  animateEnter () {
    new TimelineMax()
      .from('.DomTerrain .Tile', 0.5, {opacity: 0.8, transform: 'scale(0.0)', y: '+=2', ease: 'Cubic.easeOut'}, 0.1)
      .from('.Grid', 0.3, {opacity: 0})
    //.staggerFrom('.DomStructures .Tile', 0.5, {y: "-=10", opacity: 0, ease: 'Cubic.easeOut'}, 0.2)
      .from('.DomStructures .Tile', 0.7, {y: "-=10", opacity: 0, ease: 'Cubic.easeOut'})
      .from(['.Marker'], 0.5, {opacity: 0}, '-=0.1')
      .from('.powerline', 0.5, {opacity: 0}, "-=0.8")
      .from('.powerflow', 0.5, {opacity: 0}, "-=0.2");
  }

  render () {
    return (
      <div className="SceneTwoD" ref={c => this.scene = c}>
        <DomTerrain grid={this.state.grid} terrainTiles={this.props.terrainTiles}/>
        <Grid grid={this.state.grid} />
        <DomStructures grid={this.state.grid} structureTiles={this.props.structureTiles}/>
        <Network grid={this.state.grid} structureTiles={this.props.structureTiles}/>
        <Markers grid={this.state.grid}
          handleClick={this.props.openSystemViewerModal}
          structureTiles={this.props.structureTiles}/>
      </div>
    );
  }
}

SceneTwoD.propTypes = {
  gridSize: PropTypes.array.isRequired,
  system: PropTypes.object.isRequired,
  terrainTiles: PropTypes.array.isRequired,
  structureTiles: PropTypes.array.isRequired,
  openSystemViewerModal: PropTypes.func.isRequired,
  activateScene: PropTypes.func.isRequired,
  deactivateScene: PropTypes.func.isRequired
};

export default SceneTwoD;
