import React from 'react';
import PropTypes from 'prop-types';

SystemDataLevel.propTypes = {
  heading: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  classed: PropTypes.string
};

SystemDataLevel.defaultProps = {
  classed: ''
};

function SystemDataLevel ({heading, title, classed}) {
  return (
    <div className="column">
      <div className="level">
        <div className="level-item has-text-centered">
          <div>
            <div className="heading">{heading}</div>
            <div className={"title " + classed}>
              {title}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default SystemDataLevel;
