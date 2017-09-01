/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as timeActions from '../actions/timeActions.js';
import { timeFromInt } from '../helpers/format.js';
import pick from 'ramda/src/pick';
import where from 'ramda/src/where';
import compose from 'ramda/src/compose';
import reduce from 'ramda/src/reduce';
import filter from 'ramda/src/filter';
import path from 'ramda/src/path';
import pluck from 'ramda/src/pluck';
import tap from 'ramda/src/tap';
import equals from 'ramda/src/equals';
import propEq from 'ramda/src/propEq';
import defaultTo from 'ramda/src/defaultTo';
import T from 'ramda/src/T';
import './SystemMonitor.scss';

const capacityBy = (active, category) => {
  return compose(
    reduce((sum, arr) => sum + arr.capacity, 0),
    filter(where({category, active})),
    path(['structureTiles'])
  );
};

const curCap = (time, category, active, x) => {
  return compose(
    reduce((sum, arr) => sum + arr[time].value, 0),
    tap(console.log),
    pluck('power'),
    filter(where({category, active})),
    path(['structureTiles'])
  )(x);
};

const totalGenCap = capacityBy(T, equals('generator'));
const maxLoad = capacityBy(T, equals('consumer'));
const currentGen = capacityBy(equals(true), equals('generator'));
const currentLoad = capacityBy(equals(true), equals('consumer'));

SystemMonitor.propTypes = {
  activeScene: PropTypes.object,
  time: PropTypes.number.isRequired,
  setTime: PropTypes.func.isRequired
};

function SystemMonitor ({activeScene, time, setTime}) {
  return (
    <div className="SystemMonitor has-text-centered">
      <h3>{defaultTo('System Monitor', path(['name'], activeScene))}</h3>
      <hr />
      {
        activeScene &&
        <div>
          <div className="columns">
            <div className="column is-2 has-text-centered">
              <span>Time</span>
              <div>
                {timeFromInt(time)}
              </div>
            </div>
            <div className="column is-2 has-text-centered">
              <span>Total Capacity:</span>
              <div>
                {totalGenCap(activeScene)}
              </div>
            </div>
            <div className="column is-2 has-text-centered">
              <span>Max Load:</span>
              <div>
                {maxLoad(activeScene)}
              </div>
            </div>
            <div className="column is-2 has-text-centered">
              <span>Current Generation:</span>
              <div>
                {curCap(time, equals('generator'), equals(true), activeScene)}
              </div>
            </div>
            <div className="column is-2 has-text-centered">
              <span>Current Load:</span>
              <div>
                {curCap(time, equals('consumer'), equals(true), activeScene)}
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column is-2 has-text-centered">
              <input type="range" min="0" max="24"
                value={time}
                onChange={(e) => setTime(parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>
      }
    </div>
  );
}

const mapStateToProps = pick(['activeScene', 'time']);
const mapDispatchToProps = (dispatch) => bindActionCreators(timeActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SystemMonitor);
