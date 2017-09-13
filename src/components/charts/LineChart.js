import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  x: PropTypes.func.isRequired,
  y: PropTypes.func.isRequired,
  tag: PropTypes.string
};

function LineChart (props) {

  const line = d3.line()
    .x(d => props.x(d.date))
    .y(d => props.y(d[props.value]))
    .curve(d3.curveMonotoneX);

  return (
    <path className={"LineChart " + props.tag} d={line(props.data)}/>
  );
}

export default LineChart;
