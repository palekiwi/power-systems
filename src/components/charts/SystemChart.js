import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import PowerChart from './PowerChart.js';
import BatteryChart from './BatteryChart.js';
import PowerChartLegend from './PowerChartLegend.js';
import BatteryChartLegend from './BatteryChartLegend.js';
import XYaxis from './XYaxis.js';
import range from 'ramda/src/range';
import keys from 'ramda/src/keys';
import isNil from 'ramda/src/isNil';
import map from 'ramda/src/map';
import contains from 'ramda/src/contains';
import evolve from 'ramda/src/evolve';
import not from 'ramda/src/not';
import merge from 'ramda/src/merge';
import { parseHM, timeFromInt, fromUnix } from '../../helpers/format.js';
import './SystemChart.scss';

class SystemChart extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      width: 400,
      height: 300,
      margin: { top: 30, bottom: 30, left: 60, right: 30},
      legend: {
        totalLoad: true,
        totalGen: false,
        totalFeed: true,
        totalBuffer: true,
        totalStorage: true
      }
    };

    this.resize = this.resize.bind(this);
    this.toggleLegendField = this.toggleLegendField.bind(this);
  }

  componentDidMount () {
    window.addEventListener('resize', this.resize);
    this.resize();
    this.updateLegend();
  }

  componentDidUpdate (prevProps) {
    if (this.props.resizePane != prevProps.resizePane) this.resize();
    if (this.props.powerData != prevProps.powerData) this.updateLegend();
  }

  updateLegend () {
    this.setState({legend: merge(map(x => (x[0] && x[0].balance) ? true : false, this.props.powerData), this.state.legend)});
  }

  resize () {
    if (this.chart) {
      let {margin} = this.state;
      let w = this.chart.offsetWidth - margin.left - margin.right;
      let h = this.chart.offsetHeight - margin.top - margin.bottom;
      this.setState({width: w, height: h});
    }
  }

  toggleLegendField (s) {
    this.setState({legend: evolve({[s]: not}, this.state.legend)});
  }

  render () {
    const {type, min, max, structureTiles, powerData} = this.props;
    const ss = structureTiles.filter(s => contains(s.id, keys(powerData)));

    const state = this.state;
    const scales = {
      x: x(state.width, range(0,25).map(timeFromInt).map(parseHM)),
      y: y(state.height, min, max)};

    const pos = scales.x(d3.timeParse('%H:%M')(fromUnix(this.props.time)));

    return (
      <div className="SystemChart">
        {
          type == 'power' ?
          <PowerChartLegend
            legend={this.state.legend}
            structureTiles={structureTiles}
            toggleLegendField={this.toggleLegendField}
          />
          :
          <BatteryChartLegend
            legend={this.state.legend}
            structureTiles={structureTiles}
            toggleLegendField={this.toggleLegendField}
          />

        }
        <div className="SystemChart__Chart" ref={(chart) => this.chart = chart}>
          <svg {...svgSize(state)}>
            <g transform={transform(state)}>

              {type == 'power' ?
                <PowerChart
                  powerData={powerData}
                  legend={this.state.legend}
                  structureTiles={ss}
                  scales={scales}
                />
                :
                <BatteryChart
                  powerData={powerData}
                  legend={this.state.legend}
                  structureTiles={ss}
                  scales={scales}
                />
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
  legend: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
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
