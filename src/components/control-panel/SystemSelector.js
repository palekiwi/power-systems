import React from 'react';
import PropTypes from 'prop-types';

SystemSelector.propTypes = {
  scenes: PropTypes.array.isRequired,
  activeScene: PropTypes.object,
  setActiveScene: PropTypes.func.isRequired,
  createNewScene: PropTypes.func.isRequired,
};

function SystemSelector (props) {
  return (
    <nav className="panel" style={{background: 'white'}}>
      <p className="panel-heading">
        Power Systems
      </p>
      {props.scenes.map(s => (
        <a className={"panel-block" + (props.activeScene && s.id == props.activeScene.id ? ' is-active' : '')}
          key={s.id}
          onClick={() => props.setActiveScene(s)}>
          <span className="panel-icon">
            <i className={"fa" + (props.activeScene && s.id == props.activeScene.id ? ' fa-dot-circle-o' : 'fa-circle-o')}></i>
          </span>
          {s.name}
        </a>
        )
      )}
      <div className="panel-block">
        <button className="button is-primary is-outlined is-fullwidth"
          onClick={props.createNewScene}>
          New
        </button>
      </div>
    </nav>
  );
}

export default SystemSelector;
