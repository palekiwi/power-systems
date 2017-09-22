import React from 'react';
import PropTypes from 'prop-types';
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
  setTime: PropTypes.func.isRequired
};

function SystemData ({activeScene, time, setTime}) {
  return (
    <div className="SystemData has-text-centered">
      <h3>{defaultTo('System Data', path(['name'], activeScene))}</h3>
      {
        activeScene &&
        <div>
          <div className="columns">
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
                0
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

const mapStateToProps = pick(['activeScene', 'time', 'powerData']);
const mapDispatchToProps = (dispatch) => bindActionCreators(timeActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SystemData);
