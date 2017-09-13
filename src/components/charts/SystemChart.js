/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import LineChart from './LineChart.js';
import XYaxis from './XYaxis.js';
import propEq from 'ramda/src/propEq';
import prop from 'ramda/src/prop';
import range from 'ramda/src/range';
import max from 'ramda/src/max';
import min from 'ramda/src/min';
import map from 'ramda/src/map';
import compose from 'ramda/src/compose';
import filter from 'ramda/src/filter';
import reduce from 'ramda/src/reduce';
import pluck from 'ramda/src/pluck';
import tap from 'ramda/src/tap';
import { parseHM, timeFromInt } from '../../helpers/format.js';
import { addPower, addBuffer, addStorage } from '../../lib/helpers/power-helpers.js';
import './SystemChart.scss';

class SystemChart extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      width: 400,
      height: 300,
      margin: { top: 30, bottom: 30, left: 60, right: 30}
    };

    this.resize = this.resize.bind(this);
  }

  componentDidMount () {
    window.addEventListener('resize', this.resize);
    this.resize ();
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.resizePane != prevProps.resizePane) this.resize();
  }

  resize () {
    if (this.chart) {
      let {margin} = this.state;
      let w = this.chart.offsetWidth - margin.left - margin.right;
      let h = this.chart.offsetHeight - margin.top - margin.bottom;
      this.setState({width: w, height: h});
    }
  }

  render () {
    const {structureTiles, powerData} = this.props;
    const state = this.state;

    const totalLoad = compose(
      addPower,
      map(x => powerData[x]),
      pluck('id'),
      filter(propEq('category', 'consumer'))
    )(structureTiles);

    const totalGen = compose(
      addPower,
      map(x => powerData[x]),
      pluck('id'),
      filter(propEq('category', 'generator'))
    )(structureTiles);

    const peakLoad = d3.max(totalLoad, d => d.power);
    const peakGen = d3.max(totalGen, d => d.power);

    const high = max(peakLoad, peakGen);

    const totalBuffer = compose(
      addBuffer,
      map(x => powerData[x]),
      pluck('id'),
      filter(prop('buffer'))
    )(structureTiles);

    const totalStorage = compose(
      addStorage,
      map(x => powerData[x]),
      pluck('id'),
      filter(prop('storage'))
    )(structureTiles);

    const low = min(d3.min(totalBuffer, d => d.buffer) || 0, d3.min(totalStorage, d => d.storage) || 0);

    const scales = {
      x: x(state.width, range(0,25).map(timeFromInt).map(parseHM)),
      y: y(state.height, low, high)};

    const pos = scales.x(d3.timeParse('%H:%M')(timeFromInt(this.props.time)));
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(range(0,10));

    return (
      <div className="SystemChart">
        <div className="SystemChart__Chart" ref={(chart) => this.chart = chart} style={{height: '100%'}}>
          <svg {...svgSize(state)}>
            <g transform={transform(state)}>
              <LineChart stroke={'red'} data={totalLoad} value="power" {...scales}/>
              <LineChart stroke={'black'} data={totalGen} value="power" {...scales}/>
              {structureTiles
                .filter(x => x.category == 'generator')
                .map((el, i) =>
                  <g key={el.id}>
                    <LineChart
                      stroke={colorScale(i)}
                      value="power"
                      data={powerData[el.id]} {...scales}/>
                  </g>
                )
              }
              {structureTiles
                .filter(x => x.category == 'battery')
                .map((el, i) =>
                  <g key={el.id}>
                    <LineChart
                      stroke={"green"}
                      value="buffer"
                      data={powerData[el.id]} {...scales}/>
                    <LineChart
                      stroke={"yellow"}
                      value="storage"
                      data={powerData[el.id]} {...scales}/>
                  </g>
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
      </div>
    );
  }
}

SystemChart.propTypes = {
  resizePane: PropTypes.object.isRequired,
  structureTiles: PropTypes.array.isRequired,
  time: PropTypes.number.isRequired,
  powerData: PropTypes.object.isRequired
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

function y(height, low, high) {
  return d3.scaleLinear()
    .domain([low, high])
    .range([height, 0]);
}
