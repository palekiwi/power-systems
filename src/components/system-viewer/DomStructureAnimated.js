/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { domIsoTile } from '../../helpers/dom-helpers.js';
import { TweenMax, SteppedEase } from 'gsap';

class DomStructureAnimated extends React.Component {
  componentWillReceiveProps (nextProps) {
    console.log(nextProps.grid.tile.width);
    console.log(nextProps.tile.data.active, this.props.tile.data.active);
    let img = this.img;
    let steps = this.props.tile.texture.frames - 1;
    let width = this.props.grid.tile.width;
    let active = this.props.tile.data.active;
    this.anim = TweenMax.to(img, 2, {x: (-width * steps), repeat: -1, ease: SteppedEase.config(steps)});
    active ? this.anim.play() : this.anim.pause();
  }

  render () {
    let {grid, tile} = this.props;
    let style = domIsoTile(grid, tile);

    return (
      <div className="Tile" style={style}>
        <img className='AnimatedTile'
          ref={c => this.img = c}
          src={require('../../assets/' + tile.texture.filename)}/>
      </div>
    );
  }
}

DomStructureAnimated.propTypes = {
  grid: PropTypes.object.isRequired,
  tile: PropTypes.object.isRequired
};

export default DomStructureAnimated;
