import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const defaultStyles = {
  fill: 'none',
  stroke: 'steelblue',
  strokeWidth: '2px',
  strokeLinecap: 'round'
};

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  x: PropTypes.func.isRequired,
  y: PropTypes.func.isRequired,
  stroke: PropTypes.string
};

function LineChart (props) {
  const styles = Object.assign({}, defaultStyles, {stroke: props.stroke});

  const line = d3.line()
    .x(d => props.x(d.date))
    .y(d => props.y(d[props.value]))
    .curve(d3.curveMonotoneX);

  return (
    <path {...styles} d={line(props.data)}/>
  );
}

export default LineChart;
