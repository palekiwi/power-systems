import React from 'react';
import PropTypes from 'prop-types';

ChartControls.propTypes = {
  tl: PropTypes.object.isRequired,
  progress: PropTypes.number.isRequired,
  handleRangeChange: PropTypes.func.isRequired
};

function ChartControls ({tl, progress, handleRangeChange}) {
  return (
    <div className="columns">
      <div className="column">
        <h3>Animation Controls</h3>
        <div className="columns">
          <div className="column">
            <button className="button" onClick={() => tl.play()}>
              <span className="icon">
                <i className="fa fa-play"></i>
              </span>
            </button>

            <button className="button" onClick={() => tl.pause()}>
              <span className="icon">
                <i className="fa fa-pause"></i>
              </span>
            </button>

            <button className="button" onClick={() => tl.restart()}>
              <span className="icon">
                <i className="fa fa-repeat"></i>
              </span>
            </button>
          </div>
          <div className="column">
            <input type="range" value={progress} onChange={handleRangeChange}/>
          </div>
        </div>
      </div>
    </div>
  );
}


export default ChartControls;
