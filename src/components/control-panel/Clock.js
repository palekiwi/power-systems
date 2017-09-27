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
    <div className="Clock">
      <span>{fromUnix(time)}</span>
    </div>
  );
}


export default Clock;
