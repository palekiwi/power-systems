/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import LineChart from './LineChart.js';
import XYaxis from './XYaxis.js';
import propEq from 'ramda/src/propEq';
import evolve from 'ramda/src/evolve';
import prop from 'ramda/src/prop';
import add from 'ramda/src/add';
import range from 'ramda/src/range';
import max from 'ramda/src/max';
import map from 'ramda/src/map';
import compose from 'ramda/src/compose';
import filter from 'ramda/src/filter';
import reduce from 'ramda/src/reduce';
import pluck from 'ramda/src/pluck';
import { parseHM, timeFromInt } from '../../helpers/format.js';
import { addValues } from '../../lib/helpers/power-helpers.js';

class SystemChart extends React.Component {
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
    let h = this.chart.offsetHeight - margin.top - margin.bottom;
    this.setState({width: w, height: h});
  }

  render () {
    const {structureTiles} = this.props;
    const state = this.state;

    const instantGen = compose(
      reduce(max, 0),
      pluck('value'),
      addValues,
      map(prop('power')),
      filter(propEq('category', 'generator'))
    )(structureTiles);

    const totalLoad = compose(
      addValues,
      map(prop('power')),
      filter(propEq('category', 'consumer'))
    )(structureTiles);

    console.log(totalLoad);

    const totalGen = compose(
      addValues,
      map(prop('power')),
      filter(propEq('category', 'consumer'))
    )(structureTiles);

    const instantLoad = compose(
      reduce(max, 0),
      pluck('value'),
      addValues,
      map(prop('power')),
      filter(propEq('category', 'consumer'))
    )(structureTiles);

    const data = max(instantGen, instantLoad);

    const scales = {
      x: x(state.width, range(0,25).map(timeFromInt).map(parseHM)),
      y: y(state.height, data)};

    const pos = scales.x(d3.timeParse('%H:%M')(timeFromInt(this.props.time)));
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(range(0,10));

    return (
      <div ref={(chart) => this.chart = chart}>
        <svg {...svgSize(state)}>
          <g transform={transform(state)}>
            <LineChart stroke={'red'} data={totalLoad} {...scales}/>
            {structureTiles
              .filter(propEq('category', 'generator'))
              .map((el, i) =>
                <LineChart
                  key={el.id}
                  stroke={colorScale(i)}
                  data={el.power} {...scales}/>
              )
            }
            <g>
              <line x1={pos} y1={this.state.height} x2={pos} y2="0" stroke="black"/>
            </g>
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

SystemChart.propTypes = {
  structureTiles: PropTypes.array.isRequired,
  time: PropTypes.number.isRequired
};

export default SystemChart;

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
    .domain(d3.extent(data))
    .range([0, width]);
}

function y(height, data) {
  return d3.scaleLinear()
    .domain([0, data])
    .range([height, 0]);
}
