import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import LineChart from './LineChart.js';
import XYaxis from './XYaxis.js';
import ChartAnimationOverlay from './ChartAnimationOverlay.js';

class MicrogridChart extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      width: 400,
      height: 300,
      margin: { top: 30, bottom: 30, left: 60, right: 30}
    };
  }

  componentDidMount () {
    let {margin} = this.state;
    let w = this.chart.offsetWidth - margin.left - margin.right;
    let h = this.chart.offsetWidth * 0.75 - margin.top - margin.bottom;
    this.setState({width: w, height: h});
  }

  render () {
    const {data, timeline} = this.props;
    const state = this.state;
    const scales = {x: x(state.width, data), y: y(state.height, data)};

    return (
      <div className="card" ref={(chart) => this.chart = chart}>
        <svg {...svgSize(state)}>
          <g transform={transform(state)}>
            <LineChart
              timeline={timeline}
              data={data} {...scales}/>
            <ChartAnimationOverlay
              timeline={timeline}
              height={state.height}
              width={state.width}/>
            <XYaxis
              width={state.width}
              height={state.height}
              {...scales}/>
          </g>
        </svg>
      </div>
    );
  }
}

MicrogridChart.propTypes = {
  data: PropTypes.array.isRequired,
  timeline: PropTypes.object.isRequired
};

export default MicrogridChart;

function svgSize(state) {
  return {
    width: state.width + state.margin.left + state.margin.right,
    height: state.height + state.margin.top + state.margin.bottom
  };
}

function transform(state) {
  return `translate(${state.margin.left}, ${state.margin.bottom})`;
}

function x(width, data) {
  return d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([0, width]);
}

function y(height, data) {
  return d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value) + 100])
    .range([height, 0]);
}
