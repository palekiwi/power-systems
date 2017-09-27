import React from 'react';
import PropTypes from 'prop-types';
import {parseHM, fromUnix} from '../../helpers/format.js';

Clock.propTypes = {
  setTime: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired
};

function Clock ({time, setTime}) {
  /* eslint-disable no-console */
  return (
    <div className="box">
      <div className="has-text-centered">
        <span>{fromUnix(time)}</span>
      </div>
    </div>
  );
}


export default Clock;
