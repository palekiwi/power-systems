import React from 'react';
import PropTypes from 'prop-types';
import propEq from 'ramda/src/propEq';

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
          .map((s, i) => (
            <div key={i} style={{display: propEq('type', 'generator', s) ? 'auto' : 'none'}}>
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
