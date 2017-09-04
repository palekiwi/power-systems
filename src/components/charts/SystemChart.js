/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import LineChart from './LineChart.js';
import XYaxis from './XYaxis.js';
import propEq from 'ramda/src/propEq';
import evolve from 'ramda/src/evolve';
import { parseHM, timeFromInt } from '../../helpers/format.js';

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
    const data = structureTiles
      .find(x => x.category == 'generator')
      .power
      .map(evolve({date: parseHM}));
    console.log(data);
    const scales = {x: x(state.width, data), y: y(state.height, data)};

    const pos = scales.x(d3.timeParse('%H:%M')(timeFromInt(this.props.time)));

    return (
      <div ref={(chart) => this.chart = chart}>
        <svg {...svgSize(state)}>
          <g transform={transform(state)}>
            {structureTiles
              .filter(propEq('category', 'generator'))
              .map(el =>
                <LineChart
                  key={el.id}
                  stroke={'rgba(100,240,200,0.5)'}
                  data={el.power.map(evolve({date: parseHM}))} {...scales}/>
              )
            }
            {structureTiles
              .filter(propEq('category', 'consumer'))
              .map(el =>
                <LineChart
                  key={el.id}
                  stroke={'rgba(200,200,200,0.5)'}
                  data={el.power.map(evolve({date: parseHM}))} {...scales}/>
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
    .domain(d3.extent(data, d => d.date))
    .range([0, width]);
}

function y(height, data) {
  return d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value) + 20])
    .range([height, 0]);
}
