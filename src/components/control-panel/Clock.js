import React from 'react';
import PropTypes from 'prop-types';
import {fromUnix} from '../../helpers/format.js';
import './Clock.scss';

Clock.propTypes = {
  time: PropTypes.number.isRequired
};

function Clock ({time}) {
  return (
    <div className="Clock">
      <div className="field has-addons">
        <div className="control">
          <p className="button">
            <span className="icon is-small">
              <i className="fa fa-clock-o"></i>
            </span>
            <span>{fromUnix(time)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}


export default Clock;
