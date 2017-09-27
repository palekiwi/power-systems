import React from 'react';
import PropTypes from 'prop-types';
import SystemDataLevel from '../components/control-panel/SystemDataLevel.js';
import Clock from '../components/control-panel/Clock.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as timeActions from '../actions/timeActions.js';
import { fromUnix } from '../helpers/format.js';
import pick from 'ramda/src/pick';
import compose from 'ramda/src/compose';
import reduce from 'ramda/src/reduce';
import filter from 'ramda/src/filter';
import path from 'ramda/src/path';
import pluck from 'ramda/src/pluck';
import propEq from 'ramda/src/propEq';
import defaultTo from 'ramda/src/defaultTo';
import './SystemData.scss';

const capacityBy = (category) => {
  return compose(
    reduce((sum, arr) => sum + arr.capacity, 0),
    filter(propEq('category', category)),
    path(['structureTiles'])
  );
};

const currentAt = category => (time, x) => {
  return compose(
    reduce((sum, arr) => sum + arr[time].value, 0),
    pluck('power'),
    filter(propEq('active', true)),
    filter(propEq('category', category)),
    path(['structureTiles'])
  )(x);
};

const totalGenCap = capacityBy('generator');
const maxLoad = capacityBy('consumer');
const currentGen = currentAt('generator');
const currentLoad = currentAt('consumer');

SystemData.propTypes = {
  activeScene: PropTypes.object,
  time: PropTypes.number.isRequired,
  setTime: PropTypes.func.isRequired,
  powerData: PropTypes.object
};

function SystemData ({powerData, activeScene, time}) {
  if (!activeScene || !powerData[activeScene.id]) {
    return (<div>No data available.</div>);
  } else {
    let data = powerData[activeScene.id];
    return (
      <div className="SystemData">

        <Clock time={time}/>

        <div className="hero">
          <div className="hero-body">
            <h3 className="title has-text-centered">
              {formatName(totalGenCap, activeScene)}
            </h3>
          </div>
        </div>
        {activeScene && powerData[activeScene.id] &&
          <div>
            <div className="box">
              <div className="columns is-desktop">

                <SystemDataLevel
                  heading="Current Generation"
                  title={formatPower(data.totalGen, time)}
                />

                <SystemDataLevel
                  heading="Current Load"
                  title={formatPower(data.totalLoad, time)}
                />

                <SystemDataLevel
                  heading="Balance"
                  title={formatPower(data.powerBalance, time)}
                />

              </div>
            </div>

            <div className="box">
              <div className="columns is-desktop">

                <SystemDataLevel
                  heading="24hr Production"
                  title={formatEnergy(data.totalProduction) + 'kWh'}
                  classed="has-text-success"
                />

                <SystemDataLevel
                  heading="24hr Consumption"
                  title={formatEnergy(data.totalConsumption) + 'kWh'}
                  classed="has-text-danger"
                />

                <SystemDataLevel
                  heading="Net Energy"
                  title={formatEnergy(data.netEnergy) + 'kWh'}
                />

              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = pick(['activeScene', 'time', 'powerData']);
const mapDispatchToProps = (dispatch) => bindActionCreators(timeActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SystemData);

function formatEnergy (x) {
  return Math.round(x / 1000);
}

function formatName (f, x) {
  return f(x) + 'kW ' + x.name;
}

function formatPower (xs, time) {
  return Math.round(xs[time/86400 * 288].power * 100) / 100 + 'kW';
}
