/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { domIsoTile } from '../../helpers/dom-helpers.js';
import { TweenMax, SteppedEase } from 'gsap';

class DomStructureAnimated extends React.Component {
  componentDidUpdate (prevProps) {
    let activePath = R.path(['tile', 'active']);
    if (activePath(prevProps) !== activePath(this.props)) {
      let img = this.img;
      let steps = this.props.tile.texture.frames;
      let w = this.img.offsetWidth;
      let width = (w / steps) * (steps - 1);
      if (!this.anim) this.anim = TweenMax.to(img, 2, {x: -width, repeat: -1, ease: SteppedEase.config(steps - 1)});
      activePath(this.props) ? this.anim.play() : this.anim.pause();
    }
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
