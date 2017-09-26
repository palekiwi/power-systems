import React from 'react';
import PropTypes from 'prop-types';

ChartLegendButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
  text: PropTypes.string.isRequired,
  selector: PropTypes.string.isRequired
};

function ChartLegendButton ({handleClick, active, selector, text}) {
  return (
    <div className="control">
      <button
        onClick={handleClick}
        className={"button is-small " + selector + (active ? '' : ' is-inverted')}>
        <span className="icon is-small">
          <i className={"fa fa-" + (active ? 'eye' : 'eye-slash')}></i>
        </span>
        <span>{text}</span>
      </button>
    </div>
  );
}


export default ChartLegendButton;
