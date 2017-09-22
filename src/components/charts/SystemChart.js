/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import LineChart from './LineChart.js';
import XYaxis from './XYaxis.js';
import prop from 'ramda/src/prop';
import range from 'ramda/src/range';
import keys from 'ramda/src/keys';
import contains from 'ramda/src/contains';
import { parseHM, timeFromInt, fromUnix } from '../../helpers/format.js';
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

  componentDidUpdate (prevProps) {
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
    const {min, max, structureTiles, powerData, legend} = this.props;
    const ss = structureTiles.filter(s => contains(s.id, keys(powerData)));

    const state = this.state;
    const scales = {
      x: x(state.width, range(0,25).map(timeFromInt).map(parseHM)),
      y: y(state.height, min, max)};

    const pos = scales.x(d3.timeParse('%H:%M')(fromUnix(this.props.time)));
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(range(0,10));

    return (
      <div className="SystemChart">
        <div className="SystemChart__Chart" ref={(chart) => this.chart = chart} style={{height: '100%'}}>
          <svg {...svgSize(state)}>
            <g transform={transform(state)}>
              <g style={{'visibility': legend.totalGeneration ? 'visible' : 'hidden'}}>
                <LineChart stroke={'black'} data={powerData.totalGen} tag="totalGen" value="power" {...scales}/>
              </g>

              <g style={{'visibility': legend.totalLoad ? 'visible' : 'hidden'}}>
                <LineChart stroke={'red'} data={powerData.totalLoad} tag="totalLoad" value="power" {...scales}/>
              </g>

              <g style={{'visibility': legend.totalRamped ? 'visible' : 'hidden'}}>
                <LineChart data={powerData.totalRamped} tag="totalRamped" value="power" {...scales}/>
              </g>

              <g style={{'visibility': legend.totalFeed ? 'visible' : 'hidden'}}>
                <LineChart data={powerData.totalFeed} tag="totalFeed" value="power" {...scales}/>
              </g>

              {ss
                .filter(x => x.category == 'generator')
                .map((el, i) =>
                  <g key={el.id} style={{'visibility': el.active ? 'visible' : 'hidden'}}>
                    <LineChart
                      stroke={colorScale(i)}
                      tag={el.tag}
                      value="power"
                      data={powerData[el.id]} {...scales}/>
                  </g>
                )
              }

              {ss
                .filter(prop('buffer'))
                .map(el =>
                  <g key={el.id} style={{'visibility': legend.buffer ? 'visible' : 'hidden'}}>
                    <LineChart
                      stroke={"green"}
                      tag={"buffer"}
                      value="buffer"
                      data={powerData[el.id]} {...scales}/>
                  </g>
                )
              }

              {ss
                .filter(prop('storage'))
                .map(el =>
                  <g key={el.id} style={{'visibility': legend.storage ? 'visible' : 'hidden'}}>
                    <LineChart
                      stroke={"yellow"}
                      tag={"storage"}
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
  powerData: PropTypes.object.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  legend: PropTypes.object.isRequired
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
