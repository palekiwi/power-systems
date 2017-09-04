import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class Axis extends React.Component {
  componentDidMount () {
    this.renderAxis();
  }

  componentDidUpdate () {
    this.renderAxis();
  }

  renderAxis () {
    let node = this.axis;
    let axis = d3[this.props.axis](this.props.scale)
      .ticks(this.props.ticks)
      .tickFormat(this.props.format);
    d3.select(node).call(axis);
  }

  render () {
    return (
      <g className="axis"
        ref={axis => this.axis = axis}
        transform={this.props.transform}/>
    );
  }
}

Axis.propTypes = {
  axis: PropTypes.string.isRequired,
  scale: PropTypes.func.isRequired,
  transform: PropTypes.string.isRequired,
  format: PropTypes.func,
  ticks: PropTypes.number,
};

export default Axis;
