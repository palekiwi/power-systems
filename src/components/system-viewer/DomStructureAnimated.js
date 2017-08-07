/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { domIsoTile } from '../../helpers/dom-helpers.js';
import { TweenMax, SteppedEase } from 'gsap';

class DomStructureAnimated extends React.Component {
  componentDidMount () {
    let img = this.img;
    let steps = this.props.tile.texture.frames - 1;
    let width = this.props.grid.tile.width;
    //this.anim = TweenMax.to(img, 2, {x: (-width * steps), repeat: -1, ease: SteppedEase.config(steps)});
    console.log(img);
  }

  render () {
    let {grid, tile} = this.props;
    let style = domIsoTile(grid, tile);
    let imgStyle= {
      width: style.width * tile.texture.frames,
      height: style.height
    };

    return (
      <div className="Tile" style={style}>
        <img className=''
          ref={c => this.img = c}
          style={imgStyle}
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
