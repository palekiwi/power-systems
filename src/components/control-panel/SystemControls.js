import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

SystemControls.propTypes = {
  activeScene: PropTypes.object,
  sceneTogglePower: PropTypes.func.isRequired,
  toggleStructureActive: PropTypes.func.isRequired,
  editScene: PropTypes.func.isRequired
};

function SystemControls (props) {
  return (
    <div>
      <h4>Generators:</h4>
      <div>
        <button onClick={() => props.sceneTogglePower(true)}>All ON</button>
        <button onClick={() => props.sceneTogglePower(false)}>All OFF</button>
      </div>
      <div>
        {props.activeScene.structureTiles
          .filter(R.propEq('type', 'generator'))
          .map((s, i) => (
            <div key={s.name}>
              <span>{s.name}</span>
              <input type="checkbox"
                onChange={() => props.toggleStructureActive(i)}
                checked={s.active}/>
            </div>
          ))
        }
      </div>
      <div>
        <button onClick={props.editScene}>Edit</button>
      </div>
    </div>
  );
}


export default SystemControls;
