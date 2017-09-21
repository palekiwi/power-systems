/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import isometricGrid from '../../lib/isometric-grid.js';
import DomTerrain from './DomTerrain.js';
import DomStructures from './DomStructures.js';
import Grid from './Grid.js';
import GridControl from './GridControl.js';
import Network from './Network.js';
import Markers from './Markers.js';
import TileEditor from './TileEditor.js';
import { TimelineMax } from 'gsap';
import R from 'ramda';
import './SceneTwoD.scss';

class SceneTwoD extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      grid: isometricGrid({})
    };
    this.resize = this.resize.bind(this);
  }

  componentDidMount () {
    window.addEventListener('resize', this.resize);
    this.resize();
    //this.animateEnter();
  }
  componentDidUpdate (prevProps) {
    if (prevProps.resizePane != this.props.resizePane) this.resize();
    if (prevProps.gridSize != this.props.gridSize) this.resize();
    if (prevProps.name != this.props.name) {
      this.resize();
      //this.animateEnter();
    }
  }

  resize () {
    if (this.scene) {
      let width = this.scene.offsetWidth;
      let height = this.scene.offsetHeight;
      let grid = isometricGrid({width, height, gridSize: this.props.gridSize});
      this.setState({width, height, grid});
    }
  }

  animateEnter () {
    const tl = new TimelineMax();
    if (this.props.editor) {
      return tl;
    } else {
      tl
        .from('.DomTerrain .Tile', 0.5, {opacity: 0.8, transform: 'scale(0.0)', y: '+=2', ease: 'Cubic.easeOut'}, 0.1)
        .from('.Grid', 0.3, {opacity: 0})
      //.staggerFrom('.DomStructures .Tile', 0.5, {y: "-=10", opacity: 0, ease: 'Cubic.easeOut'}, 0.2)
        .from('.DomStructures .Tile', 0.7, {y: "-=5", opacity: 0, ease: 'Cubic.easeOut'})
        .from(['.Marker'], 0.5, {opacity: 0}, '-=0.5')
        .from('.powerline', 0.5, {opacity: 0}, "-=0.8")
        .from('.powerflow', 0.5, {opacity: 0}, "-=0.2");
    }
  }

  render () {
    let editor = this.props.editor;
    let viewer = !editor;

    return (
      <div className="SceneTwoD" ref={c => this.scene = c}>
        <DomTerrain
          grid={this.state.grid}
          terrainTiles={this.props.terrainTiles}
        />
        <Grid
          grid={this.state.grid}
        />
        { viewer &&
          <Network
            grid={this.state.grid}
            structureTiles={this.props.structureTiles}
            time={this.props.time}
          />
        }
        { viewer &&
          <Markers
            grid={this.state.grid}
            setActiveStructure={this.props.setActiveStructure}
            openSVModal={this.props.openSVModal}
            closeSVModal={this.props.closeSVModal}
            structureTiles={this.props.structureTiles}
          />
        }
        <DomStructures
          grid={this.state.grid}
          structureTiles={this.props.structureTiles}
        />
        { editor &&
          <GridControl
            grid={this.state.grid}
            setActiveTile={this.props.setActiveTile}
          />
        }
        { !R.isNil(this.props.activeTile) &&
          <TileEditor
            saveTile={this.props.saveTile}
            activeTile={this.props.activeTile}
            resetActiveTile={this.props.resetActiveTile}
            deleteTile={this.props.deleteTile}
            terrainTile={getTileByPosition('terrainTiles', this.props)}
            structureTile={getTileByPosition('structureTiles', this.props)}
          />
        }
      </div>
    );
  }
}

SceneTwoD.propTypes = {
  name: PropTypes.string.isRequired,
  gridSize: PropTypes.array.isRequired,
  terrainTiles: PropTypes.array.isRequired,
  structureTiles: PropTypes.array.isRequired,
  openSVModal: PropTypes.func.isRequired,
  closeSVModal: PropTypes.func.isRequired,
  setActiveStructure: PropTypes.func.isRequired,
  setActiveTile: PropTypes.func.isRequired,
  resetActiveTile: PropTypes.func.isRequired,
  deleteTile: PropTypes.func.isRequired,
  saveTile: PropTypes.func.isRequired,
  activeTile: PropTypes.object,
  resizePane: PropTypes.object,
  editor: PropTypes.bool.isRequired,
  time: PropTypes.number.isRequired
};

export default SceneTwoD;

function getTileByPosition (type, props) {
  const pos = props.activeTile;
  return R.prop(type, props).find(t => t.position.equals(pos));
}
